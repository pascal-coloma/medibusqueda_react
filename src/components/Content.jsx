import { useState } from "react"

function Content() {

    const [medicamento, setMedicamento] = useState("")

    return (
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2">
                        <h5>Ubicacion</h5>
                        <select id="ciudad" name="ciudad" class="form-select mb-3" aria-label="Default select example">
                            <option value="0">Seleccione ciudad</option>
                            <option value="1" id="vinna">Viña del Mar</option>
                            <option value="2" id="valpo">Valparaiso</option>
                            <option value="3" id="chillan">Chillan</option>
                        </select>
                        <form>
                            <div class="input-group mb-3 ">
                                <input type="text" class="form-control" placeholder="Medicamento" aria-label="Med Search"
                                    aria-describedby="button-addon2" value={medicamento} onChange={(e) => setMedicamento(e.target.value)} />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" onClick={() => alert("Medicamento " + medicamento)}>Buscar </button>
                                </div>
                            </div>
                        </form>
                        <div class="col-md-8">
                            <div class="row row-cols-1 row-cols-md-2 g-4" id="contenedor">
                                <div class="col">
                                    <p>Use el cuadro de busqueda para mostrar resultados</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Content
