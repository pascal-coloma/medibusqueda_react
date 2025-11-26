import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";
import { obtainUsers } from "../Api/ApiUsers";

function Login() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    const validate = async (e) => {
        e.preventDefault();
        setError("");

        const inputCorreo = correo.trim();
        const inputPass = pass;

        if (!inputCorreo || !inputPass) {
            setError("Ingrese correo y contraseña");
            return;
        }

        let usuarios;
        try {
            usuarios = await obtainUsers();
        } catch (err) {
            console.error(err);
            setError("Error al obtener usuarios. Intente más tarde.");
            return;
        }
        try {
            const clave = usuarios.some(usuario => usuario.clave === inputPass)
            if (clave) {
                localStorage.setItem("correo", inputCorreo);
                setTimeout(() => {
                    navigate('/perfil');
                }, 2000);
            } else{
                setError("Credenciales incorrectas")
            }

        } catch (e) {
            console.err(e);
            setError("Error al iniciar sesion")
        }
    };

    return (
        <>
            <NavBar />
            <main
                className="d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "#caf8f2", minHeight: "80vh" }}
            >
                <div
                    className="card p-3 p-md-4 shadow-lg rounded-4 animate__animated animate__fadeInUp"
                    style={{ maxWidth: "400px", width: "100%" }}
                >
                    <h2 className="text-center mb-3 text-primary fw-bold">
                        Iniciar Sesión
                    </h2>

                    <form onSubmit={validate}>
                        <div className="mb-2">
                            <label htmlFor="emailLogin" className="form-label fw-semibold">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="emailLogin"
                                className="form-control"
                                placeholder="Ingrese su correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="passwordLogin" className="form-label fw-semibold">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="passwordLogin"
                                className="form-control"
                                placeholder="Ingrese su contraseña"
                                minLength="4"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <a href="registro" className="text-decoration-none small">
                                Crear cuenta
                            </a>
                            <a href="recovery" className="text-decoration-none small">
                                Olvidé mi contraseña
                            </a>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 py-2">
                            Enviar
                        </button>

                        {error && (
                            <p className="text-danger text-center mt-2 small">{error}</p>
                        )}
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Login;
