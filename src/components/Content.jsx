function Content() {
    return (
        <>
            <div class="container-fluid">
                <section class="hero-section mb-5 mt-5">
                    <div class="container" id="conte-hero">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <h1 class="hero-title">Encuentra tus medicamentos</h1>
                                <p class="hero-description">Crea tu perfil, registra tu ubicacion preferida y guarda tus
                                    medicamentos mas buscados</p>
                                <a href="registro.html" class="btn btn-outline-primary btn-lg">Registrate</a>
                            </div>
                            <div class="col-md-6">
                                <img src="https://cdn.pixabay.com/photo/2023/09/20/07/36/doctor-8264057_1280.jpg"
                                    alt="Hero Image" class="rounded img-fluid hero-image" />
                            </div>
                        </div>
                    </div>
                </section>
                <div class="row">
                    <div class="col-md-2">
                        <h5>Ubicacion</h5>
                        <select id="ciudad" name="ciudad" class="form-select mb-3" aria-label="Default select example">
                            <option value="0">Seleccione una ciudad</option>
                            <option value="1" id="vinna">Viña del Mar</option>
                            <option value="2" id="valpo">Valparaiso</option>
                            <option value="3" id="chillan">Chillan</option>
                        </select>
                        <div class="input-group mb-3 ">
                            <input type="text" class="form-control" placeholder="Medicamento" aria-label="Med Search"
                                aria-describedby="button-addon2" id="cuadroMed" />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="consultarBtn">Buscar</button>
                            </div>

                        </div>


                        <div class="col-md-8">
                            <div class="row row-cols-1 row-cols-md-2 g-4" id="contenedor">
                                <div class="col">
                                    <h3>Use el cuadro de busqueda para mostrar resultados</h3>
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
