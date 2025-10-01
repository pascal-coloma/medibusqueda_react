import { useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import { useContext, useState } from "react"
import { LoginContext } from "./LoginContext"

function Login() {
    const navegador = useNavigate()
    const {login} = useContext(LoginContext)
    
    const [usuario, setUsuario] = useState("")


    const validacion = () => {
        if (usuario === "diego" || usuario === "hola@hola.cl") {
            localStorage.setItem("user", "diego")
            localStorage.setItem("mail", "hola@hola.cl")
            navegador("/perfil")    
        } else{
            alert("usuario no registrado")
        }
        
    }

    return (
        <>
            <NavBar />
            <hr />
            <div>
                <form action="">
                    <label htmlFor="">Usuario</label>
                    <input type="text" 
                    value = {usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    />
                    <button onClick={validacion}  >Iniciar sesion</button>
                </form>
            </div>

        </>
    )
}

export default Login