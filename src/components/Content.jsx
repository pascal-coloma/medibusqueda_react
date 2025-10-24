import { useEffect, useState } from "react"
import CardMedicamento from "./CardMedicamento"

function Content() {
    const [medicamento, setMedicamento] = useState("")
    const ciudadGuardada = localStorage.getItem("ciudad")
    const [ciudad, setCiudad] = useState(ciudadGuardada ? ciudadGuardada : "0")
    const [medicamentos, setMedicamentos] = useState([])

    let ubicacion = { latitud: "", longitud: "" }
    switch (ciudad) {
        case "1":
            ubicacion.latitud = "-33.02457"
            ubicacion.longitud = "-71.55183"
            break
        case "2":
            ubicacion.latitud = "-33.0473128"
            ubicacion.longitud = "-71.6127458"
            break
        case "3":
            ubicacion.latitud = "-36.6062508"
            ubicacion.longitud = "-72.1023137"
            break
        default:
            break
    }

    const consultarApi = () => {
        const ultimas = JSON.parse(localStorage.getItem("busquedasRecientes")) || []
        const url = "http://54.161.22.247/api/medicamento"
        const payload = {
            latitud: ubicacion.latitud,
            longitud: ubicacion.longitud,
            nombreMedicamento: medicamento.toUpperCase(),
        }

        if (!payload.latitud) {
            alert("Seleccione ubicación")
            return
        }

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((json) => {
                guardarMeds(json["listado"])
                ultimas.push(payload.nombreMedicamento)
                localStorage.setItem("busquedasRecientes", JSON.stringify(ultimas))
            })
            .catch((error) => console.log(error.message))
    }

    function guardarMeds(arreglo) {
        const nuevosMedicamentos = []
        for (let index = 0; index < arreglo.length; index++) {
            const med = arreglo[index]
            const productos = med["presentacionesExistentes"][0]["productos"]
            for (let i = 0; i < productos.length; i++) {
                nuevosMedicamentos.push(productos[i])
            }
        }
        setMedicamentos(nuevosMedicamentos)
        localStorage.setItem("medicamentos", JSON.stringify(nuevosMedicamentos))
    }

    return (
        <>
            <div className="container-fluid py-4">
                <div className="row justify-content-center">

                    <div className="col-md-4">
                        <div
                            className="card border-0 shadow-sm rounded-4 p-4"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.9)",
                                backdropFilter: "blur(4px)",
                            }}
                        >
                            <h5 className="fw-bold mb-3 text-primary">
                                <i className="fas fa-map-marker-alt me-2"></i>Ubicación y búsqueda
                            </h5>

                            <form id="formCiudad" className="text-start" style={{borderRadius: "20px"}}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="ciudad"
                                        className="form-label fw-semibold text-secondary">
                                        Seleccione ciudad
                                    </label>
                                    <select
                                        value={ciudad}
                                        onChange={(e) => setCiudad(e.target.value)}
                                        id="ciudad"
                                        name="ciudad"
                                        className="form-select form-select-lg shadow-sm border-0 rounded-3"
                                        aria-label="Select city">
                                        <option value="0">Ciudad</option>
                                        <option value="1" id="vinna">
                                            Viña del Mar
                                        </option>
                                        <option value="2" id="valpo">
                                            Valparaíso
                                        </option>
                                        <option value="3" id="chillan">
                                            Chillán
                                        </option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="inpMedicamento"
                                        className="form-label fw-semibold text-secondary"
                                    >
                                        Medicamento
                                    </label>
                                    <div className="input-group shadow-sm rounded-3 overflow-hidden">
                                        <input
                                            type="text"
                                            className="form-control border-0"
                                            placeholder="Ej: Paracetamol"
                                            name="inpMedicamento"
                                            id="inpMedicamento"
                                            value={medicamento}
                                            onChange={(e) => setMedicamento(e.target.value)}
                                        />
                                        <button
                                            className="btn btn-primary fw-semibold"
                                            type="button"
                                            onClick={consultarApi}
                                            style={{
                                                transition: "transform 0.2s ease, box-shadow 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "scale(1.05)"
                                                e.currentTarget.style.boxShadow =
                                                    "0 4px 10px rgba(0,0,0,0.2)"
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "scale(1)"
                                                e.currentTarget.style.boxShadow = ""
                                            }}
                                        >
                                            <i className="fas fa-search me-1"></i>Buscar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="col-md-8 mt-4 mt-md-0">
                        <div className="d-flex autowrap row g-4">
                            {medicamentos.length > 0 ? (
                                medicamentos.map((prod, index) => (
                                    <div key={index} className="col-sm-12 col-sm-6 col-md-6 col-lg-6">
                                        <CardMedicamento producto={prod} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted mt-5">
                                    <i className="fas fa-prescription-bottle-alt fa-2x mb-3"></i>
                                    <p>Busca un medicamento para ver los resultados aquí.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content
