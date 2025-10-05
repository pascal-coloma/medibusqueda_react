import { redirect, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useContext, useEffect, useState } from "react"


function Login() {
    const navegador = useNavigate()

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")

    const validate = () =>{
        const usuario = JSON.parse(localStorage.getItem('username'))
        const contra = JSON.parse(localStorage.getItem('pass'))

        if (usuario === user && contra === pass){
            navegador("/")
        }
    }
    
    return (
        <>
            <NavBar />
            <main>
                <div className="LoginUsr">
                    <label htmlFor="Userlogin" className="form-label"><strong>Usuario</strong></label>
                    <input type="text" id="Userlogin" className="form-control" aria-describedby="passwordHelpBlock"
                        placeholder="Ingrese su usuario" value={user} onChange={(e) => setUser(e.target.value)} />

                    <label htmlFor="passwordLogin" className="form-label"><strong>Contraseña</strong></label>
                    <input type="password" id="passwordLogin" className="form-control" aria-describedby="passwordHelpBlock"
                        placeholder="Ingrese su contraseña" minLength="4" value={pass} onChange={(e) => setPass(e.target.value)} />
                    <div className="links d-flex flex-column gap-1">
                        <a href="registro">Crear cuenta</a>
                        <a href="recovery">Olvidé mi contraseña</a>
                    </div>
                </div>

                <button type="button" onClick={validate} className="btn btn-success mx-auto d-block">Enviar</button>
            </main>

            <div className="container" id="conte_footer">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/">
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F011%2F057%2F192%2Fnon_2x%2Fmagnifying-glass-or-search-icon-magnifier-glass-sign-vector.jpg&f=1&nofb=1&ipt=f83efa21b5b2a393fdc129f11b830ae912c8c3af3fcd7ff28d4d299bfd0294ac"
                                alt="logo_medbus" width="30" height="30" />
                        </a>
                        <span className="text-muted">© 2025 MediBusqueda</span>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Login