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

        const lista = usuariosResp && (usuariosResp.usuarios) || [];

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

        alert("Inicio de sesión exitoso")
        localStorage.setItem('ciudad', usuarioEncontrado.ciudad)
        localStorage.setItem('username', JSON.stringify(inputUser))
        localStorage.removeItem("busquedasrecientes")
        navigate('/perfil')
    }

    return (
        <>
            <NavBar />
            <main className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#caf8f2', minHeight: '80vh' }}>
                <div className="card p-3 p-md-4 shadow-lg rounded-4 animate__animated animate__fadeInUp" style={{ maxWidth: '400px', width: '100%' }}>
                    <h2 className="text-center mb-3 text-primary">Iniciar Sesión</h2>

                    <form onSubmit={validate}>
                        <div className="mb-2">
                            <label htmlFor="Userlogin" className="form-label">Usuario</label>
                            <input type="text" id="Userlogin" className="form-control" placeholder="Ingrese su usuario"
                                value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="passwordLogin" className="form-label">Contraseña</label>
                            <input type="password" id="passwordLogin" className="form-control" placeholder="Ingrese su contraseña"
                                minLength="4" value={pass} onChange={(e) => setPass(e.target.value)} />
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <a href="registro" className="text-decoration-none small">Crear cuenta</a>
                            <a href="recovery" className="text-decoration-none small">Olvidé mi contraseña</a>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 py-2">Enviar</button>

                        {error && <p className="text-danger text-center mt-2 small">{error}</p>}
                    </form>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default Login
