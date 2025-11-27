import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { obtainUsers, registrarUsuario } from "../Api/ApiUsers";
import { useForm } from "react-hook-form";
import CiudadSelect from "../components/CiudadSelect";

function calcularDV(rut) {
    if (!/^[0-9]{7,8}$/.test(rut)) return null;
    let suma = 0;
    let multiplicador = 2;
    for (let i = rut.length - 1; i >= 0; i--) {
        suma += parseInt(rut[i], 10) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const resto = 11 - (suma % 11);
    if (resto === 11) return "0";
    if (resto === 10) return "K";
    return String(resto);
}

function Registro() {
    const navigate = useNavigate();
    const [errorGeneral, setErrorGeneral] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [ciudad, setCiudad] = useState("0");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        setValue,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            rut: "",
            dv_rut: "",
            pnombre: "",
            snombre: "",
            apaterno: "",
            amaterno: "",
            correo: "",
            clave: "",
            confirmarClave: "",
            acceptTerms: false,
            ciudad: "0",
        },
    });

    const watchedPassword = watch("clave");

    const handleCiudadChange = (value) => {
        setCiudad(value);
        setValue("ciudad", value, { shouldValidate: true });
    };

    const registrar = async (data) => {
        setErrorGeneral("");

        let usuarios;
        try {
            usuarios = await obtainUsers();
        } catch (err) {
            console.error(err);
            setErrorGeneral("No se pudo verificar usuarios. Intente más tarde.");
            return;
        }

        try {
            const existe = usuarios.some((usuario) => usuario.rut === data.rut);

            if (existe) {
                setErrorGeneral("RUT ya registrado");
                setShowPopup(false);
                return;
            }

            await registrarUsuario({
                rut: data.rut,
                dv_rut: data.dv_rut.toUpperCase(),
                pnombre: data.pnombre,
                snombre: data.snombre,
                apaterno: data.apaterno,
                amaterno: data.amaterno,
                correo: data.correo,
                clave: data.clave,
                ciudad: {
                    id_ciudad: Number(data.ciudad),
                },
            });

            setShowPopup(true);

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            setErrorGeneral("Error al registrar usuario");
        }
    };

    return (
        <>
            <NavBar />

            <div
                className="d-flex justify-content-center align-items-center py-5"
                style={{
                    minHeight: "100vh",
                    filter: showPopup ? "blur(5px)" : "none",
                    transition: "filter 0.3s",
                }}
            >
                <div
                    className="card p-4 p-md-5 shadow-lg rounded-4 animate__animated animate__fadeInUp"
                    style={{ maxWidth: 500, width: "100%" }}
                >
                    <h2 className="text-center mb-4 fw-bold">Registro de Usuario</h2>

                    <form onSubmit={handleSubmit(registrar)}>
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
                                    {...register("rut", {
                                        required: "El RUT es obligatorio",
                                        pattern: {
                                            value: /^[0-9]{7,8}$/,
                                            message: "El RUT debe contener solo números (7 u 8 dígitos)",
                                        },
                                        validate: {
                                            modulo11: (value) => {
                                                const dvEsperado = calcularDV(value);
                                                const dvIngresado = (getValues("dv_rut") || "").toUpperCase();
                                                if (!dvEsperado) return "RUT inválido";
                                                if (!dvIngresado) return true;
                                                return (
                                                    dvEsperado === dvIngresado ||
                                                    `Dígito verificador no valido`
                                                );
                                            },
                                        },
                                    })}
                                />

                                <span className="fw-bold">-</span>

                                <input
                                    type="text"
                                    id="dv_rut"
                                    className="form-control rounded-pill text-uppercase text-center"
                                    placeholder="DV"
                                    maxLength={1}
                                    style={{ width: "60px" }}
                                    {...register("dv_rut", {
                                        required: "El dígito verificador es obligatorio",
                                        pattern: {
                                            value: /^[0-9Kk]{1}$/,
                                            message:
                                                "El dígito verificador debe ser un número o la letra K",
                                        },
                                        validate: {
                                            modulo11: (value) => {
                                                const rut = getValues("rut");
                                                if (!/^[0-9]{7,8}$/.test(rut)) return true;
                                                const dvEsperado = calcularDV(rut);
                                                if (!dvEsperado) return "RUT inválido";
                                                return (
                                                    dvEsperado === value.toUpperCase() ||
                                                    `Digito verificador no valido`
                                                );
                                            },
                                        },
                                    })}
                                />
                            </div>

                            {errors.rut && (
                                <small className="text-danger d-block mt-1">
                                    {errors.rut.message}
                                </small>
                            )}
                            {errors.dv_rut && (
                                <small className="text-danger d-block mt-1">
                                    {errors.dv_rut.message}
                                </small>
                            )}
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="pnombre" className="form-label fw-semibold">
                                Primer nombre
                            </label>
                            <input
                                type="text"
                                id="pnombre"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su primer nombre"
                                {...register("pnombre", {
                                    required: "El primer nombre es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "El primer nombre debe tener al menos 3 caracteres",
                                    },
                                })}
                            />
                            {errors.pnombre && (
                                <small className="text-danger">{errors.pnombre.message}</small>
                            )}
                        </div>

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

                        <div className="mb-3 text-start">
                            <label htmlFor="apaterno" className="form-label fw-semibold">
                                Apellido paterno
                            </label>
                            <input
                                type="text"
                                id="apaterno"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su apellido paterno"
                                {...register("apaterno", {
                                    required: "El apellido paterno es obligatorio",
                                    minLength: {
                                        value: 2,
                                        message: "Debe ingresar su apellido paterno",
                                    },
                                })}
                            />
                            {errors.apaterno && (
                                <small className="text-danger">{errors.apaterno.message}</small>
                            )}
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="amaterno" className="form-label fw-semibold">
                                Apellido materno
                            </label>
                            <input
                                type="text"
                                id="amaterno"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su apellido materno"
                                {...register("amaterno", {
                                    required: "El apellido materno es obligatorio",
                                    minLength: {
                                        value: 2,
                                        message: "Debe ingresar su apellido materno",
                                    },
                                })}
                            />
                            {errors.amaterno && (
                                <small className="text-danger">{errors.amaterno.message}</small>
                            )}
                        </div>

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
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Debe ingresar un correo electrónico válido",
                                    },
                                })}
                            />
                            {errors.correo && (
                                <small className="text-danger">{errors.correo.message}</small>
                            )}
                            <div className="form-text">
                                Nunca compartiremos su correo.
                            </div>
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="clave" className="form-label fw-semibold">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="clave"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su contraseña"
                                {...register("clave", {
                                    required: "La contraseña es obligatoria",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "La contraseña debe tener al menos 8 caracteres",
                                    },
                                })}
                            />
                            {errors.clave && (
                                <small className="text-danger">{errors.clave.message}</small>
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
                                    required: "Debe confirmar la contraseña",
                                    validate: (value) =>
                                        value === watchedPassword ||
                                        "Las contraseñas no coinciden",
                                })}
                            />
                            {errors.confirmarClave && (
                                <small className="text-danger">
                                    {errors.confirmarClave.message}
                                </small>
                            )}
                        </div>

                        <div className="mb-3 text-start">
                            <label className="form-label fw-semibold">Ciudad</label>
                            <CiudadSelect value={ciudad} onChange={handleCiudadChange} />
                            <input
                                type="hidden"
                                {...register("ciudad", {
                                    validate: (value) =>
                                        value && value !== "0"
                                            ? true
                                            : "Seleccione una ciudad",
                                })}
                            />
                            {errors.ciudad && (
                                <small className="text-danger d-block mt-1">
                                    {errors.ciudad.message}
                                </small>
                            )}
                        </div>

                        <div className="mb-4 form-check">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                className="form-check-input"
                                {...register("acceptTerms", {
                                    required: "Debe aceptar los términos y condiciones",
                                })}
                            />
                            <label
                                className="form-check-label fw-semibold"
                                htmlFor="acceptTerms"
                            >
                                Acepto los{" "}
                                <a
                                    href="#"
                                    className="text-decoration-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowTermsModal(true);
                                    }}
                                >
                                    términos y condiciones
                                </a>
                            </label>
                            {errors.acceptTerms && (
                                <div>
                                    <small className="text-danger">
                                        {errors.acceptTerms.message}
                                    </small>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 rounded-pill fw-bold shadow-sm"
                        >
                            Registrar
                        </button>

                        {errorGeneral && (
                            <div className="mt-3 text-danger text-center">
                                {errorGeneral}
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Modal éxito registro */}
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
                        <div
                            className="spinner-border text-primary mt-3"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Términos y condiciones */}
            {/* Modal Términos y condiciones */}
            {showTermsModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1100 }}
                >
                    <div
                        className="bg-white p-4 rounded-4 shadow-lg animate__animated animate__fadeInDown"
                        style={{ maxWidth: 600, width: "90%" }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4
                                className="mb-0"
                                style={{ color: "#2b2b2b", fontWeight: "700" }}
                            >
                                Términos y condiciones
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Cerrar"
                                onClick={() => setShowTermsModal(false)}
                            />
                        </div>

                        <p className="mb-2" style={{ color: "#2b2b2b" }}>
                            Al registrarte en esta plataforma aceptas que:
                        </p>

                        <ul>
                            <li style={{ color: "#2b2b2b" }}>
                                Almacenemos los datos personales que ingresas en el formulario
                                de registro (RUT, nombre, correo, ciudad, etc.) con el fin de
                                gestionar tu cuenta y mejorar la experiencia de uso.
                            </li>

                            <li style={{ color: "#2b2b2b" }}>
                                Podemos utilizar tus datos de ubicación (cuando nos los
                                proporciones o los autorices en tu dispositivo) para mostrarte
                                medicamentos y farmacias cercanas a tu posición.
                            </li>

                            <li style={{ color: "#2b2b2b" }}>
                                La información de ubicación se usa exclusivamente para
                                ofrecerte resultados relevantes y no se compartirá con terceros
                                sin tu consentimiento, salvo obligación legal.
                            </li>

                            <li style={{ color: "#2b2b2b" }}>
                                Puedes solicitar la actualización o eliminación de tus datos
                                personales conforme a la legislación vigente de protección de
                                datos.
                            </li>
                        </ul>

                        <p className="mb-0" style={{ color: "#2b2b2b" }}>
                            Si no estás de acuerdo con estos términos, te recomendamos no
                            completar el registro ni marcar la casilla de aceptación.
                        </p>

                        <div className="text-end mt-3">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShowTermsModal(false)}
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}





            <Footer />
        </>
    );
}

export default Registro;
