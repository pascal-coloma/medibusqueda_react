import { useEffect, useState } from "react"
import CardMedicamento from "./CardMedicamento"
import { ciudadId, traerCiudades } from "../Api/ApiCiudad"
import {consultarApi} from "../Api/ApiMedicamentos"
import CiudadSelect from "./CiudadSelect"

function Content() {
    const [medicamento, setMedicamento] = useState("")
    const ciudadGuardada = localStorage.getItem("ciudad")
    const [ciudad, setCiudad] = useState(ciudadGuardada ? ciudadGuardada : "0")
    const [medicamentos, setMedicamentos] = useState([])

    const handleBuscar = () => {
        consultarApi(ciudad, medicamento, setMedicamentos)
    }
    
    return (
        <>
            <div className="container-fluid py-4">
                <div className="row justify-content-center">

                    {/* Formulario de búsqueda */}
                    <div className="col-md-4">
                        <div
                            className="card border-0 shadow-sm rounded-4 p-4 animate__animated animate__fadeInLeft"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.9)",
                                backdropFilter: "blur(4px)",
                            }}
                        >
                            <h5 className="fw-bold mb-3 text-primary">
                                <i className="fas fa-map-marker-alt me-2"></i>Ubicación y búsqueda
                            </h5>

                            <form id="formCiudad" className="text-start" style={{ borderRadius: "20px" }}>
                                <CiudadSelect value={ciudad} onChange={setCiudad} />
                            
                                <div className="mb-3">
                                    <label
                                        htmlFor="inpMedicamento"
                                        className="form-label fw-semibold text-secondary"
                                    >
                                        Medicamento
                                    </label>
                                    <div className="input-group shadow-sm rounded-3 overflow-hidden animate__animated animate__fadeInUp animate__delay-1s">
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
                                            onClick={handleBuscar}
                                            style={{
                                                transition: "transform 0.2s ease, box-shadow 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "scale(1.05)";
                                                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "scale(1)";
                                                e.currentTarget.style.boxShadow = "";
                                            }}
                                        >
                                            <i className="fas fa-search me-1"></i>Buscar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Resultados */}
                    <div className="col-md-8 mt-4 mt-md-0">
                        <div className="d-flex autowrap row g-4">
                            
                            {medicamentos.length > 0 ? (
                                medicamentos.map((prod, index) => (
                                    <div
                                        key={index}
                                        className="col-sm-12 col-sm-6 col-md-6 col-lg-6 animate__animated animate__fadeInUp"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <CardMedicamento producto={prod} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted mt-5 animate__animated animate__fadeInUp">
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
