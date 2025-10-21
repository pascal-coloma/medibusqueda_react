import { Link } from "react-router-dom"
import { useContext } from "react"
import { LoginContext } from "./LoginContext"

function NavBar() {
    const {logout} = useContext(LoginContext)

   function test(){
    if (localStorage.getItem("username")) {
        return <a className="nav-link" href="login" onClick={logout} id="sesionNav">Cerrar Sesion</a>
    } else {
        return <a className="nav-link" href="login" id="sesionNav">Iniciar Sesion</a>
    }
   }
    return (
        <>  
        <div className="fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid" id="barra_nav">
                    <a href="/">
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F011%2F057%2F192%2Fnon_2x%2Fmagnifying-glass-or-search-icon-magnifier-glass-sign-vector.jpg&f=1&nofb=1&ipt=f83efa21b5b2a393fdc129f11b830ae912c8c3af3fcd7ff28d4d299bfd0294ac"
                            alt="logo_medbus" width="30" height="30"/>
                    </a>
                    <a className="navbar-brand" href="/">MediBusqueda</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="perfil">Perfil</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contacto">Contacto</a>
                            </li>
                            <li className="nav-item"> 
                                {test()}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
        </>
    )
}

export default NavBar