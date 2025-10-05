import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Registro() {

    const navegador = useNavigate()
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("")
    const [contrasenna, setContrasenna] = useState("")
    const [contra2, setContra2] = useState("")
    const [ciudad, setCiudad] = useState()
    
    // Uso de localstorage para almacenamiento de credenciales 
    useEffect(() => {
        localStorage.setItem("username", JSON.stringify(usuario))
    }, [usuario]);

    useEffect(() => {
        localStorage.setItem("pass", JSON.stringify(contra2) )
    }, [contra2])

    return (
        <>
            <NavBar />
            <div className="crearUser" />
            <form>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label"><strong>Nombre de usuario</strong></label>
                    <input type="text" id="userId" className="form-control" aria-describedby="emailHelp"
                        placeholder="Ingrese su nombre de usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label"><strong>Email</strong></label>
                    <input type="email" className="form-control" id="correo" aria-describedby="emailHelp"
                        placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label"><strong>Contraseña</strong></label>
                    <input type="password" className="form-control" id="password1" placeholder="Ingrese su contraseña" value={contrasenna} onChange={(e) => setContrasenna(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label"><strong>Repetir contraseña</strong></label>
                    <input type="password" className="form-control" id="password2" placeholder="Confirme su contraseña" value={contra2} onChange={(e) => setContra2(e.target.value)}></input>
                </div>

                <select id="ciudad" className="form-select" aria-label="Default select example" value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
                    <option value="0">Seleccione una ciudad</option>
                    <option value="1">Viña del mar</option>
                    <option value="2">Valparaiso</option>
                    <option value="3">Chillan</option>
                </select>

                <div id="selec_ciudad" className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <label className="form-check-label" htmlFor="exampleCheck1"><strong>Acepto los <a href="">términos y
                        condiciones</a></strong></label>
                </div>
                <button type="submit" className="btn btn-success mx-auto d-block">
                    Enviar
                </button>
            </form>

            <Footer />

        </>
    )
}

export default Registro