function Hero(){
    return (
        <>
            <section class="hero-section mb-5 mt-5">
                    <div class="container" id="conte-hero">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <h1 class="hero-title">Encuentra tus medicamentos</h1>
                                <p class="hero-description">Crea tu perfil, registra tu ubicacion preferida y guarda tus
                                    medicamentos mas buscados</p>
                                <a href="registro" class="btn btn-outline-primary btn-lg">Registrate</a>
                            </div>
                            <div class="col-md-6">
                                <img src="https://cdn.pixabay.com/photo/2023/09/20/07/36/doctor-8264057_1280.jpg"
                                    alt="Hero Image" class="rounded img-fluid hero-image" />
                            </div>
                        </div>
                    </div>
                </section>
        </>
    )
}

export default Hero