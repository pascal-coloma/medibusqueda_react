import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Registro() {

    const [usuario, setUsuario] = useState("")
    const [email, setEmail] = useState("")
    const [contrasenna, setContrasenna] = useState("")
    const [contra2, setContra2] = useState("")
    const [ciudad, setCiudad] = useState("0")

    const validacion = () => {
 
        let arregloDatos = JSON.parse(localStorage.getItem("arregloDatos")) || []
        if(usuario=="" || email=="" || contrasenna=="" || contra2==""){
            alert("Los campos no pueden estar vacios")
            return
        } else if(usuario.length < 5){
            alert("El nombre de usuario debe tener al menos 5 caracteres")
            return
        }else if(contrasenna !== contra2){
            alert("Las contraseñas no coinciden")
            return
        } else if(ciudad=='0'){
            alert("Debe seleccionar una ciudad")
            return
        }else{
            for(let i=0; i<arregloDatos.length; i++){
                if(arregloDatos[i].usuario === usuario || arregloDatos[i].email === email){
                    alert("El usuario o email ya están registrados")
                    return
                }
            }
        }
    }

    return (
         
        <>
            <NavBar />
            
                <div className="crearUser" />
                <form>
                    <div className="mb-3">
                        <label  className="form-label"><strong>Nombre de usuario</strong></label>
                        <input type="text" value={usuario} onChange={(e)=>setUsuario(e.target.value)} className="form-control" aria-describedby="emailHelp"
                            placeholder="Ingrese su nombre de usuario"/>
                    </div>
                     <div className="mb-3">
                        <label class="form-label"><strong>Email</strong></label>
                        <input type="email" class="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} aria-describedby="emailHelp"
                            placeholder="Ingrese su email"/>
                        <div id="emailHelp" class="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label"><strong>Contraseña</strong></label>
                        <input type="password" className="form-control" value={contrasenna} onChange={(e)=>setContrasenna(e.target.value)} placeholder="Ingrese su contraseña"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Repetir contraseña</strong></label>
                        <input type="password" className="form-control" value={contra2} onChange={(e)=>setContra2(e.target.value)} placeholder="Confirme su contraseña"></input>
                    </div>

                    <select id="ciudad" value={ciudad} onChange={(e)=>setCiudad(e.target.value)} className="form-select" aria-label="Default select example">
                        <option value="0">Seleccione una ciudad</option>
                        <option value="1">Viña del mar</option>
                        <option value="2">Valparaiso</option>
                        <option value="3">Chillan</option>
                    </select>

                    <div id="selec_ciudad" className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                        <label className="form-check-label" for="exampleCheck1"><strong>Acepto los <a href="">términos y
                            condiciones</a></strong></label>
                    </div>
                    <button type="button" onClick={validacion} className="btn btn-success mx-auto d-block">
                        Enviar
                    </button>
                </form>

                <Footer />
            </>
    )
}

export default Registro