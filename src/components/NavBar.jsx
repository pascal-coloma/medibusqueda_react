import { useContext } from "react"
import { LoginContext } from "./LoginContext"

function NavBar() {
    const {logout} = useContext(LoginContext)

    function authLink() {
        if (localStorage.getItem("username")) {
            return <a className="nav-link" href="login" onClick={logout}>Cerrar Sesión</a>
        } else {
            return <a className="nav-link" href="login">Iniciar Sesión</a>
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.85)"}}>
            <div className="container">
                <a href="/" className="navbar-brand d-flex align-items-center">
                    <img src="/magnifying-glass-or-search-icon-magnifier-glass-sign-vector-3814876275.jpg" 
                        alt="logo_medbus" width="30" height="30" className="me-2"/>
                    MediBusqueda
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link active" href="/">Inicio</a></li>
                        <li className="nav-item"><a className="nav-link" href="perfil">Perfil</a></li>
                        <li className="nav-item"><a className="nav-link" href="contacto">Contacto</a></li>
                        <li className="nav-item">{authLink()}</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
