import { useState } from "react"
import CardMedicamento from "./CardMedicamento"

function Content() {

    const [medicamento, setMedicamento] = useState("")
    const [ciudad, setCiudad] = useState("0")
    let medicamentos = []

    let ubicacion = {
        latitud: '',
        longitud: ''
    }
    switch (ciudad) {
        case "1":
            ubicacion.latitud = "-33.0513034",
                ubicacion.longitud = "-71.6233221"
            break;
        case "2":
            ubicacion.latitud = "-33.0473128",
                ubicacion.longitud = "-71.6127458"
        case "3":
            ubicacion.latitud = "-36.6062508",
                ubicacion.longitud = "-72.1023137"
        default:
            break;
    }

    const consultarApi = () => {

        const url = "http://localhost:3000/api/medicamento"
        const payload = {
            latitud: ubicacion.latitud,
            longitud: ubicacion.longitud,
            nombreMedicamento: medicamento.toUpperCase()
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(json => {
                guardarMeds(json['listado'])
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    function guardarMeds(arreglo) {
        for (let index = 0; index < arreglo.length; index++) {
            const med = arreglo[index];
            const productos = med['presentacionesExistentes'][0]['productos']
            for (let i = 0; i < productos.length; i++) {
                const producto = productos[i];
                medicamentos.push(producto)
            }
        }
        const laboratorios = medicamentos.map((obj) => {
            return <h1>{obj.laboratorio}</h1>
        })
        
        console.log(laboratorios)

    }
    //Rellenar cards de manera dinamica

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <h5>Ubicacion</h5>
                        <form id="formCiudad">
                            <label>
                                Seleccione ciudad:
                                <select
                                    value={ciudad} onChange={e => setCiudad(e.target.value)}
                                    id="ciudad" name="ciudad" className="form-select mb-3" aria-label="Select city">
                                    <option value="0"></option>
                                    <option value="1" id="vinna">Viña del Mar</option>
                                    <option value="2" id="valpo">Valparaiso</option>
                                    <option value="3" id="chillan">Chillan</option>
                                </select>
                            </label>
                            <div className="input-group mb-3 ">
                                <input type="text" className="form-control" placeholder="Medicamento" name="inpMedicamento" aria-label="Med Search"
                                    aria-describedby="button-addon2" value={medicamento} onChange={(e) => setMedicamento(e.target.value)} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => { consultarApi() }}>Buscar </button>
                                </div>
                            </div>
                        </form>
                        <div className="col-md-8">
                            
                        </div>
                    </div>

                </div>
            </div>
        </>

    )

}

export default Content
