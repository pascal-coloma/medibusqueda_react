import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { obtainUsers, registrarUsuario } from "../Api/ApiUsers";
import { useForm } from "react-hook-form";
import CiudadSelect from "../components/CiudadSelect";

function Registro() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const watchedPassword = watch('clave');

    useEffect(() => {
        setValue('ciudad', '0')
    }, [setValue])

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

        // Guardar usuario y mostrar popup
        try {
            const existe = usuarios.some(usuario => usuario.rut === data.rut);

            if (existe) {
                setError("RUT ya registrado")
                setShowPopup(false);
                return;
            }
            await registrarUsuario({
                rut: data.rut,
                dv_rut: data.dv_rut,
                pnombre: data.pnombre,
                snombre: data.snombre,
                apaterno: data.apaterno,
                amaterno: data.amaterno,
                correo: data.correo,
                clave: data.clave,
                id_ciudad: Number(data.ciudad)
            });

            setShowPopup(true);

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError("Error al registrar usuario")
        }

    };

    const validarFormulario = (data) => {
        // Validar RUT numérico
        if (!/^[0-9]{7,8}$/.test(data.rut)) {
            setError("El RUT debe contener solo números (7 u 8 dígitos)");
            return false;
        }
        // Validar dígito verificador
        if (!/^[0-9Kk]{1}$/.test(data.dv_rut)) {
            setError("El dígito verificador debe ser un número o la letra K");
            return false;
        }
        // Validar primer nombre
        if (!data.pnombre || data.pnombre.trim().length < 2) {
            setError("El primer nombre debe tener al menos 2 caracteres");
            return false;
        }
        // Validar apellidos
        if (!data.apaterno || data.apaterno.trim().length < 2) {
            setError("Debe ingresar su apellido paterno");
            return false;
        }
        if (!data.amaterno || data.amaterno.trim().length < 2) {
            setError("Debe ingresar su apellido materno");
            return false;
        }
        // Validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.correo)) {
            setError("Debe ingresar un correo electrónico válido");
            return false;
        }
        // Validar contraseña
        if (!data.clave || data.clave.length < 4) {
            setError("La contraseña debe tener al menos 4 caracteres");
            return false;
        }
        // Validar términos
        if (!data.acceptTerms) {
            setError("Debe aceptar los términos y condiciones");
            return false;
        }
        if (!data.ciudad || String(data.ciudad) === '0'){
            setError("Seleccione una ciudad");
            return false;
        }
        // Si todo es válido
        setError("");
        return true;
    };


    return (
        <>
            <NavBar />

            <div
                className="d-flex justify-content-center align-items-center py-5"
                style={{
                    backgroundColor: "#caf8f2",
                    minHeight: "100vh",
                    filter: showPopup ? "blur(5px)" : "none",
                    transition: "filter 0.3s"
                }}
            >
                <div
                    className="card p-4 p-md-5 shadow-lg rounded-4 animate__animated animate__fadeInUp"
                    style={{ maxWidth: 500, width: "100%" }}
                >
                    <h2 className="text-center mb-4 text-primary fw-bold">Registro de Usuario</h2>

                    <form onSubmit={handleSubmit(registrar)}>
                        {/* RUT y DV */}
                        <div className="mb-3 text-start">
                            <label htmlFor="rut" className="form-label fw-semibold">
                                RUT (Sin puntos ni guion)
                            </label>

                            <div className="d-flex align-items-center gap-2">
                                <input
                                    type="text"
                                    id="rut"
                                    className="form-control rounded-pill"
                                    placeholder="Ej: 12345678"
                                    maxLength={8}
                                    style={{ flex: 1 }}
                                    {...register("rut", { required: true, pattern: /^[0-9]{7,8}$/ })}
                                />

                                <span className="fw-bold">-</span>

                                <input
                                    type="text"
                                    id="dv_rut"
                                    className="form-control rounded-pill text-uppercase text-center"
                                    placeholder="DV"
                                    maxLength={1}
                                    style={{ width: "60px" }}
                                    {...register("dv_rut", { required: true, pattern: /^[0-9Kk]{1}$/ })}
                                />
                            </div>

                            {errors.rut && (
                                <small className="text-danger d-block mt-1">
                                    Ingrese un RUT válido (solo números)
                                </small>
                            )}
                            {errors.dv_rut && (
                                <small className="text-danger d-block mt-1">
                                    Dígito verificador inválido
                                </small>
                            )}
                        </div>


                        {/* Primer Nombre */}
                        <div className="mb-3 text-start">
                            <label htmlFor="pnombre" className="form-label fw-semibold">
                                Primer nombre
                            </label>
                            <input
                                type="text"
                                id="pnombre"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su primer nombre"
                                {...register("pnombre", { required: true })}
                            />
                            {errors.pnombre && (
                                <small className="text-danger">El primer nombre es obligatorio</small>
                            )}
                        </div>

                        {/* Segundo Nombre (opcional) */}
                        <div className="mb-3 text-start">
                            <label htmlFor="snombre" className="form-label fw-semibold">
                                Segundo nombre
                            </label>
                            <input
                                type="text"
                                id="snombre"
                                className="form-control rounded-pill"
                                placeholder="(opcional)"
                                {...register("snombre")}
                            />
                        </div>

                        {/* Apellido Paterno */}
                        <div className="mb-3 text-start">
                            <label htmlFor="apaterno" className="form-label fw-semibold">
                                Apellido paterno
                            </label>
                            <input
                                type="text"
                                id="apaterno"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su apellido paterno"
                                {...register("apaterno", { required: true })}
                            />
                            {errors.apaterno && (
                                <small className="text-danger">El apellido paterno es obligatorio</small>
                            )}
                        </div>

                        {/* Apellido Materno */}
                        <div className="mb-3 text-start">
                            <label htmlFor="amaterno" className="form-label fw-semibold">
                                Apellido materno
                            </label>
                            <input
                                type="text"
                                id="amaterno"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su apellido materno"
                                {...register("amaterno", { required: true })}
                            />
                            {errors.amaterno && (
                                <small className="text-danger">El apellido materno es obligatorio</small>
                            )}
                        </div>

                        {/* Correo */}
                        <div className="mb-3 text-start">
                            <label htmlFor="correo" className="form-label fw-semibold">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="correo"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su email"
                                {...register("correo", {
                                    required: true,
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                })}
                            />
                            {errors.correo && <small className="text-danger">Correo inválido</small>}
                            <div className="form-text">
                                Nunca compartiremos su correo con nadie más.
                            </div>
                        </div>

                        {/* Clave */}
                        <div className="mb-3 text-start">
                            <label htmlFor="clave" className="form-label fw-semibold">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="clave"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su contraseña"
                                {...register("clave", { required: true, minLength: 4 })}
                            />
                            {errors.clave && (
                                <small className="text-danger">
                                    La contraseña debe tener al menos 4 caracteres
                                </small>
                            )}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="confirmarClave" className="form-label fw-semibold">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmarClave"
                                className="form-control rounded-pill"
                                placeholder="Repita su contraseña"
                                {...register("confirmarClave", {
                                    required: true,
                                    validate: value => value === watchedPassword || "Las contraseñas no coinciden"
                                })}
                            />
                            {errors.confirmarClave && (
                                <small className="text-danger">{errors.confirmarClave.message}</small>
                            )}
                        </div>
                        <CiudadSelect value={watch('ciudad') || '0'} onChange={(v) => setValue('ciudad', v)} />
                        {/* Aceptar términos */}
                        <div className="mb-4 form-check">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                className="form-check-input"
                                {...register("acceptTerms", { required: true })}
                            />
                            <label
                                className="form-check-label fw-semibold"
                                htmlFor="acceptTerms"
                            >
                                Acepto los{" "}
                                <a href="#" className="text-decoration-none">
                                    términos y condiciones
                                </a>
                            </label>
                            {errors.acceptTerms && (
                                <div>
                                    <small className="text-danger">
                                        Debe aceptar los términos y condiciones
                                    </small>
                                </div>
                            )}
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 rounded-pill fw-bold shadow-sm"
                        >
                            Registrar
                        </button>

                        {error && <div className="mt-3 text-danger text-center">{error}</div>}
                    </form>
                </div>
            </div>

            {/* Modal popup */}
            {showPopup && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
                >
                    <div
                        className="bg-white p-4 rounded-4 shadow-lg text-center animate__animated animate__fadeInDown"
                        style={{ maxWidth: 400, width: "90%" }}
                    >
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
