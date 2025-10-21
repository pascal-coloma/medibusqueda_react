import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useState } from "react"
import { obtainUsers } from "../Api/ApiUsers"



function Login() {
    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")

    const validate = async (e) => {
        e.preventDefault();
        setError("");

        const inputUser = user.trim();
        const inputPass = pass;

        if (!inputUser || !inputPass) {
            setError('Ingrese usuario y contraseña');
            return;
        }

        let usuariosResp;
        try {
            usuariosResp = await obtainUsers();
        } catch (err) {
            console.error(err);
            setError('Error al obtener usuarios. Intente más tarde.');
            return;
        }

        const lista = usuariosResp && (usuariosResp.usuarios || usuariosResp.users || Array.isArray(usuariosResp) && usuariosResp) || [];

        if (!Array.isArray(lista)) {
            setError('Respuesta de usuarios inválida');
            return;
        }

        const usuarioEncontrado = lista.find(u => (
            (u.nombre === inputUser || u.correo === inputUser)
        ) && (
            u.contraseña === inputPass
        ));

        if (!usuarioEncontrado) {
            setError("Usuario o contraseña incorrectos")
            return
        }

        alert("Inicio de sesion exitoso")
        localStorage.setItem('username', JSON.stringify(inputUser))
        navigate('/perfil')
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

                {error && <p className="text-danger text-center mt-3">{error}</p>}
            </main>

            <Footer/>
        </>
    )
}

export default Login