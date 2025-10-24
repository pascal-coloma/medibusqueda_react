import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { obtainUsers } from "../Api/ApiUsers";
import { useForm } from "react-hook-form";

function Registro() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const watchedPassword = watch('contrasenna');

    const registrar = async (data) => {
        setError("");

        // Validaciones básicas
        if (!validarFormulario(data)) return;

        // Verificar existencia de usuario
        let usuarios;
        try {
            usuarios = await obtainUsers();
        } catch (err) {
            console.error(err);
            setError('No se pudo verificar usuarios. Intente más tarde.');
            return;
        }

        if (usuarioExistente(usuarios.usuarios, data)) {
            setError('El usuario ya existe');
            return;
        }

        // Guardar usuario y mostrar popup
        localStorage.setItem('username', JSON.stringify(data.usuario));
        setShowPopup(true);

        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    const validarFormulario = (data) => {
        if (data.usuario.length < 5) {
            setError("El nombre de usuario debe tener al menos 5 caracteres");
            return false;
        }
        if (data.contrasenna !== data.contra2) {
            setError("Las contraseñas no coinciden");
            return false;
        }
        if (data.ciudad === '0') {
            setError("Debe seleccionar una ciudad");
            return false;
        }
        if (!data.acceptTerms) {
            setError("Debe aceptar los términos y condiciones");
            return false;
        }
        return true;
    };

    const usuarioExistente = (lista, data) => {
        return lista.find(u => u.nombre === data.usuario || u.correo === data.email);
    };

    return (
        <>
            <NavBar />

            <div
                className="d-flex justify-content-center align-items-center py-5"
                style={{
                    backgroundColor: '#caf8f2',
                    minHeight: '100vh',
                    filter: showPopup ? "blur(5px)" : "none",
                    transition: "filter 0.3s"
                }}
            >
                <div className="card p-4 p-md-5 shadow-lg rounded-4 animate__animated animate__fadeInUp" style={{ maxWidth: 500, width: '100%' }}>
                    <h2 className="text-center mb-4 text-primary fw-bold">Registro</h2>

                    <form onSubmit={handleSubmit(registrar)}>
                        {/* Usuario */}
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label fw-semibold">Nombre de usuario</label>
                            <input
                                type="text"
                                id="userId"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su nombre de usuario"
                                {...register('usuario', { required: true })}
                            />
                            {errors.usuario && <small className="text-danger">El nombre es obligatorio</small>}
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label fw-semibold">Email</label>
                            <input
                                type="email"
                                id="correo"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su email"
                                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                            />
                            {errors.email && <small className="text-danger">Email inválido</small>}
                            <div className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                        </div>

                        {/* Contraseña */}
                        <div className="mb-3">
                            <label htmlFor="password1" className="form-label fw-semibold">Contraseña</label>
                            <input
                                type="password"
                                id="password1"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su contraseña"
                                {...register('contrasenna', { required: true, minLength: 4 })}
                            />
                            {errors.contrasenna && <small className="text-danger">La contraseña debe tener al menos 4 caracteres</small>}
                        </div>

                        {/* Confirmar Contraseña */}
                        <div className="mb-3">
                            <label htmlFor="password2" className="form-label fw-semibold">Repetir contraseña</label>
                            <input
                                type="password"
                                id="password2"
                                className="form-control rounded-pill"
                                placeholder="Confirme su contraseña"
                                {...register('contra2', { required: true, validate: (val) => val === watchedPassword })}
                            />
                            {errors.contra2 && <small className="text-danger">Las contraseñas no coinciden</small>}
                        </div>

                        {/* Ciudad */}
                        <div className="mb-3">
                            <label htmlFor="ciudad" className="form-label fw-semibold">Ciudad</label>
                            <select id="ciudad" className="form-select rounded-pill" {...register('ciudad', { required: true })}>
                                <option value="0">Seleccione una ciudad</option>
                                <option value="1">Viña del Mar</option>
                                <option value="2">Valparaiso</option>
                                <option value="3">Chillan</option>
                            </select>
                            {errors.ciudad && <small className="text-danger">Debe seleccionar una ciudad</small>}
                        </div>

                        {/* Términos */}
                        <div className="mb-4 form-check">
                            <input
                                type="checkbox"
                                id="exampleCheck1"
                                className="form-check-input"
                                {...register('acceptTerms')}
                            />
                            <label className="form-check-label fw-semibold" htmlFor="exampleCheck1">
                                Acepto los <a href="#" className="text-decoration-none">términos y condiciones</a>
                            </label>
                            {errors.acceptTerms && <div><small className="text-danger">Debe aceptar los términos y condiciones</small></div>}
                        </div>

                        {/* Botón */}
                        <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold shadow-sm">
                            Enviar
                        </button>

                        {error && <div className="mt-3 text-danger text-center">{error}</div>}
                    </form>
                </div>
            </div>

            {/* Modal popup */}
            {showPopup && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
                    <div className="bg-white p-4 rounded-4 shadow-lg text-center animate__animated animate__fadeInDown" style={{ maxWidth: 400, width: "90%" }}>
                        <h4 className="text-success mb-3">¡Registro exitoso!</h4>
                        <p>Serás redirigido al inicio de sesión...</p>
                        <div className="spinner-border text-primary mt-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default Registro;
