import "../components/hero.css"

import { useContext } from 'react'
import { LoginContext } from './LoginContext'

function Hero() {

    const { usuario } = useContext(LoginContext)

    function iniciado() {
        if (usuario) {
            return <>
                <p className="hero-description">Visita tu perfil</p>
                <a href="perfil" className="btn btn-primary btn-lg hero-btn">Perfil</a>
            </>
        } else {
            return <>
                <p className="hero-description">
                    Crea tu perfil, registra tu ubicación preferida y visualiza tus medicamentos más buscados
                </p>
                <a href="registro" className="btn btn-primary btn-lg hero-btn">Regístrate</a>
            </>
        }
    }

    return (
        <section className="hero-section py-5 mt-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h1 className="hero-title display-4 fw-bold">Encuentra tus medicamentos</h1>
                        {iniciado()}
                    </div>
                    <div className="col-md-6 text-center">
                        <div style={{maxWidth: "400px", width: "100%"}}>
                            <img
                                src="https://cdn.pixabay.com/photo/2023/09/20/07/36/doctor-8264057_1280.jpg"
                                alt="Hero"
                                className="img-fluid rounded shadow hero-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
