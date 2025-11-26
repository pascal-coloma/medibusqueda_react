import { useContext } from "react"
import { LoginContext } from "./LoginContext"
import { useNavigate } from 'react-router-dom'
import "../components/navbar.css"

function NavBar() {
    const { logout, usuario } = useContext(LoginContext)
    const navigate = useNavigate()

    function authLink() {
        if (usuario) {
            return <a className="nav-link" href="#" onClick={() => { logout(); navigate('/login') }}>Cerrar Sesión</a>
        } else {
            return <a className="nav-link" href="login">Iniciar Sesión</a>
        }
    }

    return (
        <nav
            className="navbar navbar-light navbar-expand-lg fixed-top shadow-sm"
            style={{
                backdropFilter: "blur(10px)",  
                backgroundColor: "rgba(255,255,255,0.75)",
                transition: "all 0.3s ease",
                zIndex: 1030
            }}
        >
            <div className="container">
                
                <a href="/" className="navbar-brand d-flex align-items-center">
                    <img
                        src="/magnifying-glass-or-search-icon-magnifier-glass-sign-vector-3814876275.jpg"
                        alt="logo_medbus"
                        width="30" height="30"
                        className="me-2 rounded-circle"
                    />
                    <span className="fw-bold">MediBusqueda</span>
                </a>

                
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link fw-semibold text-dark px-3" href="/">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold text-dark px-3" href="perfil">Perfil</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold text-dark px-3" href="contacto">Contacto</a>
                        </li>
                        <li className="nav-item">
                            {authLink()}
                        </li>
                    </ul>
                </div>
            </div>

        </nav>


    )
}

export default NavBar
