import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Registro() {

    const navegador = useNavigate()
    const [usuario, setUsuario] = useState("")
    const [email, setEmail] = useState("")
    const [contrasenna, setContrasenna] = useState("")
    const [contra2, setContra2] = useState("")
    const [ciudad, setCiudad] = useState()

    return (
        <>  
        <body>
            <NavBar />
            
                <div class="crearUser" />
                <form>
                    <div class="mb-3">
                        <label for="userId" class="form-label"><strong>Nombre de usuario</strong></label>
                        <input type="text" id="userId" class="form-control" aria-describedby="emailHelp"
                            placeholder="Ingrese su nombre de usuario"></input>
                    </div>
                    <div class="mb-3">
                        <label for="correo" class="form-label"><strong>Email</strong></label>
                        <input type="email" class="form-control" id="correo" aria-describedby="emailHelp"
                            placeholder="Ingrese su email"></input>
                        <div id="emailHelp" class="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                    </div>
                    <div class="mb-3">
                        <label for="password1" class="form-label"><strong>Contraseña</strong></label>
                        <input type="password" class="form-control" id="password1" placeholder="Ingrese su contraseña"></input>
                    </div>
                    <div class="mb-3">
                        <label for="password2" class="form-label"><strong>Repetir contraseña</strong></label>
                        <input type="password" class="form-control" id="password2" placeholder="Confirme su contraseña"></input>
                    </div>

                    <select id="ciudad" class="form-select" aria-label="Default select example">
                        <option value="0">Seleccione una ciudad</option>
                        <option value="1">Viña del mar</option>
                        <option value="2">Valparaiso</option>
                        <option value="3">Chillan</option>
                    </select>

                    <div id="selec_ciudad" class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                        <label class="form-check-label" for="exampleCheck1"><strong>Acepto los <a href="">términos y
                            condiciones</a></strong></label>
                    </div>
                    <button type="button" class="btn btn-success mx-auto d-block">
                        Enviar
                    </button>
                </form>

                <Footer />
            </body>
        </>
    )
}

export default Registro