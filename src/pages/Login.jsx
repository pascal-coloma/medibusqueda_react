import Footer from "../components/Footer"
import { redirect, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useContext, useEffect, useState } from "react"
import { obtainUsers } from "../Api/ApiUsers"


function Login() {
    const navegador = useNavigate()

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")
    

    const validate = async(e) =>{
        const usuario = JSON.parse(localStorage.getItem('username'))
        const contra = JSON.parse(localStorage.getItem('pass'))
        const usuarios = await obtainUsers()
        setError("");
        e.preventDefault();

        const usuarioEncontrado = usuarios.usuarios.find(u=> u.nombre === usuario || u.correo === usuario && u.contraseña === contra)

        if(!usuarioEncontrado){
            setError("Usuario o contraseña incorrectos")
            return
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

            <Footer/>
        </>
    )
}

export default Login