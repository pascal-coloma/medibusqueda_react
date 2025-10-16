import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { obtainUsers } from "../Api/ApiUsers"
// import {login} from "../components/LoginContext";

function Registro() {

    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("")
    const [contrasenna, setContrasenna] = useState("")
    const [contra2, setContra2] = useState("")
    const [ciudad, setCiudad] = useState("0")
    const [acceptTerms, setAcceptTerms] = useState(false)
    const navigate = useNavigate();
    const [error, setError] = useState("")

    const validacion = async (e) => {
        e.preventDefault();
        setError("");

        if (usuario === "" || email === "" || contrasenna === "" || contra2 === "") {
            setError("Los campos no pueden estar vacios");
            return;
        }

        if (usuario.length < 5) {
            setError("El nombre de usuario debe tener al menos 5 caracteres");
            return;
        }

        if (contrasenna !== contra2) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (ciudad === '0') {
            setError("Debe seleccionar una ciudad");
            return;
        }

        if (!acceptTerms) {
            setError("Debe aceptar los términos y condiciones");
            return;
        }

        
        let usuarios;
        try {
            usuarios = await obtainUsers();
        } catch (err) {
            console.error(err);
            setError('No se pudo verificar usuarios. Intente más tarde.');
            return;
        }

        const usuarioEncontrado = usuarios.usuarios.find(u => u.nombre === usuario || u.correo === usuario);

        if (usuarioEncontrado) {
            setError("El usuario ya existe");
            return;
        }

        // Si llega aquí la validación pasó
        alert("Usuario creado con exito");
        navigate("/");
    }
    
    // Uso de localstorage para almacenamiento de credenciales 
    useEffect(() => {
        localStorage.setItem("username", JSON.stringify(usuario))
    }, [usuario])

    useEffect(() => {
        localStorage.setItem("pass", JSON.stringify(contra2) )
    }, [contra2])

    return (
        <>
            <NavBar />
            <div className="crearUser" />
            <form onSubmit={validacion}>
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

                    <select id="ciudad" value={ciudad} onChange={(e)=>setCiudad(e.target.value)} className="form-select" aria-label="Default select example">
                        <option value="0">Seleccione una ciudad</option>
                        <option value="1">Viña del mar</option>
                        <option value="2">Valparaiso</option>
                        <option value="3">Chillan</option>
                    </select>

                    <div id="selec_ciudad" className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                        <label className="form-check-label" htmlFor="exampleCheck1"><strong>Acepto los <a href="">términos y
                            condiciones</a></strong></label>
                    </div>
                    <button type="submit"  className="btn btn-success mx-auto d-block">
                        Enviar
                    </button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}

            <Footer />

        </>
    )
}

export default Registro