import { useState, useEffect, useContext } from "react"
import Mapa from "../components/mapa"
import NavBar from "../components/NavBar"
import Modal from "../components/modal"
import "../components/cards.css"
import { LoginContext } from "../components/LoginContext"

function capitalizarNombreCompleto(str) {
    if (!str) return ""
    return str
        .split(" ")
        .filter(Boolean)
        .map(
            (palabra) =>
                palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
        )
        .join(" ")
}

// Intenta primero pnombre/snombre/apaterno/amaterno.
// Si no existen, cae a usuario.nombre.
function obtenerNombreYApellidosDesdeUsuario(usuario) {
    if (!usuario) return { nombre: "", apellidos: "" }

    const tienePartes =
        usuario.pnombre || usuario.snombre || usuario.apaterno || usuario.amaterno

    if (tienePartes) {
        const nombres = [usuario.pnombre, usuario.snombre].filter(Boolean).join(" ")
        const apellidos = [usuario.apaterno, usuario.amaterno].filter(Boolean).join(" ")
        return {
            nombre: capitalizarNombreCompleto(nombres),
            apellidos: capitalizarNombreCompleto(apellidos),
        }
    }

    if (usuario.nombre) {
        const partes = usuario.nombre.trim().split(" ").filter(Boolean)
        if (partes.length === 1) {
            return {
                nombre: capitalizarNombreCompleto(partes[0]),
                apellidos: "",
            }
        }
        const nombre = capitalizarNombreCompleto(partes[0])
        const apellidos = capitalizarNombreCompleto(partes.slice(1).join(" "))
        return { nombre, apellidos }
    }

    return { nombre: "", apellidos: "" }
}

function Contacto() {
    const { usuario } = useContext(LoginContext)

    const [mostrarModal, setModal] = useState(false)
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        asunto: "",
        mensaje: "",
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!usuario) return

        const { nombre, apellidos } = obtenerNombreYApellidosDesdeUsuario(usuario)

        setFormData((prev) => ({
            ...prev,
            nombre: prev.nombre.trim() ? prev.nombre : nombre,
            apellidos: prev.apellidos.trim() ? prev.apellidos : apellidos,
            email: prev.email.trim() ? prev.email : (usuario.correo || ""),
        }))
    }, [usuario])

    const validarFormulario = () => {
        const nuevoError = {}
        if (!formData.nombre.trim()) nuevoError.nombre = "Campo requerido"
        if (!formData.apellidos.trim()) nuevoError.apellidos = "Campo requerido"
        if (!formData.email.trim()) {
            nuevoError.email = "Campo requerido"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            nuevoError.email = "Correo inválido"
        }
        if (!formData.asunto.trim()) nuevoError.asunto = "Campo requerido"
        if (!formData.mensaje.trim()) nuevoError.mensaje = "Campo requerido"
        setErrors(nuevoError)
        return Object.keys(nuevoError).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validarFormulario()) {
            setModal(true)
        }
    }

    const handleCloseModal = () => {
        setModal(false)

        let nombreBase = ""
        let apellidosBase = ""
        let emailBase = ""

        if (usuario) {
            const datos = obtenerNombreYApellidosDesdeUsuario(usuario)
            nombreBase = datos.nombre
            apellidosBase = datos.apellidos
            emailBase = usuario.correo || ""
        }

        setFormData({
            nombre: nombreBase,
            apellidos: apellidosBase,
            email: emailBase,
            asunto: "",
            mensaje: "",
        })
        setErrors({})
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <NavBar />

            <div className="min-vh-100 d-flex align-items-center py-5">
                <div className="container">
                    <div className="row justify-content-center animate__animated animate__fadeInUp animate__faster">
                        <div className="col-lg-10">
                            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                                <div className="row g-0">
                                    <div
                                        className="col-md-5 p-4 d-flex flex-column justify-content-between animate__animated animate__fadeInLeft"
                                        style={{
                                            background: "linear-gradient(300deg, #4b6da1ff 0%, #1565c0 100%)",
                                            color: "white",
                                        }}
                                    >
                                        <div className="text-start">
                                            <h3 className="mb-4 fw-bold" style={{ color: "#fff" }}>
                                                Ponte en contacto
                                            </h3>
                                            <p
                                                className="mb-4 text-light"
                                                style={{ fontSize: "0.95rem", opacity: 0.9 }}
                                            >
                                                Nos encantaría conocer tus opiniones o comentarios.
                                                Contáctanos con los datos de abajo o rellena el formulario para recibir respuesta a la brevedad.
                                            </p>

                                            {[
                                                {
                                                    icon: "fas fa-map-marker-alt",
                                                    title: "Dirección",
                                                    text: "Av. Alvarez 1335\nViña del Mar, Valparaíso",
                                                },
                                                {
                                                    icon: "fas fa-phone",
                                                    title: "Teléfono",
                                                    text: "+569 12 35 67 89",
                                                },
                                                {
                                                    icon: "fas fa-envelope",
                                                    title: "Email",
                                                    text: "contacto@medibusqueda.com",
                                                },
                                            ].map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="d-flex align-items-start mb-4 p-2 rounded"
                                                    style={{
                                                        transition: "background 0.3s ease, transform 0.2s",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background =
                                                            "rgba(255,255,255,0.15)"
                                                        e.currentTarget.style.transform = "translateX(5px)"
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = ""
                                                        e.currentTarget.style.transform = "translateX(0)"
                                                    }}
                                                >
                                                    <div className="me-3 fs-4 text-warning">
                                                        <i className={item.icon}></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="fw-semibold mb-1 text-white">
                                                            {item.title}
                                                        </h6>
                                                        <p
                                                            className="mb-0 text-light"
                                                            style={{ whiteSpace: "pre-line" }}
                                                        >
                                                            {item.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="rounded-3 overflow-hidden mt-4 animate__animated animate__zoomIn">
                                            <Mapa initialCiudad="0" />
                                        </div>
                                    </div>

                                    <div
                                        className="col-md-7 p-5 animate__animated animate__fadeInRight animate__delay-1s"
                                        style={{
                                            background: "linear-gradient(135deg, #eceef1ff 0%, #dfe4ee 100%)",
                                        }}
                                    >
                                        <h3
                                            className="mb-4 fw-bold"
                                            style={{ color: "#0d47a1", letterSpacing: "-0.5px" }}
                                        >
                                            Envíanos un mensaje
                                        </h3>

                                        <form onSubmit={handleSubmit} noValidate className="text-start">
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label text-dark fw-semibold">
                                                        Nombre
                                                    </label>
                                                    <input
                                                        name="nombre"
                                                        type="text"
                                                        className={`form-control form-control-lg border-0 shadow-sm ${
                                                            errors.nombre ? "is-invalid" : ""
                                                        }`}
                                                        value={formData.nombre}
                                                        onChange={handleChange}
                                                        placeholder="Juan"
                                                    />
                                                    {errors.nombre && (
                                                        <div className="invalid-feedback">
                                                            {errors.nombre}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label text-dark fw-semibold">
                                                        Apellidos
                                                    </label>
                                                    <input
                                                        name="apellidos"
                                                        type="text"
                                                        className={`form-control form-control-lg border-0 shadow-sm ${
                                                            errors.apellidos ? "is-invalid" : ""
                                                        }`}
                                                        value={formData.apellidos}
                                                        onChange={handleChange}
                                                        placeholder="Pérez Beltrán"
                                                    />
                                                    {errors.apellidos && (
                                                        <div className="invalid-feedback">
                                                            {errors.apellidos}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label text-dark fw-semibold">
                                                    Correo electrónico
                                                </label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className={`form-control form-control-lg border-0 shadow-sm ${
                                                        errors.email ? "is-invalid" : ""
                                                    }`}
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="juan@ejemplo.com"
                                                />
                                                {errors.email && (
                                                    <div className="invalid-feedback">
                                                        {errors.email}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label text-dark fw-semibold">
                                                    Asunto
                                                </label>
                                                <input
                                                    name="asunto"
                                                    type="text"
                                                    className={`form-control form-control-lg border-0 shadow-sm ${
                                                        errors.asunto ? "is-invalid" : ""
                                                    }`}
                                                    value={formData.asunto}
                                                    onChange={handleChange}
                                                    placeholder="¿Cómo podemos ayudar?"
                                                />
                                                {errors.asunto && (
                                                    <div className="invalid-feedback">
                                                        {errors.asunto}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label text-dark fw-semibold">
                                                    Mensaje
                                                </label>
                                                <textarea
                                                    name="mensaje"
                                                    className={`form-control form-control-lg border-0 shadow-sm ${
                                                        errors.mensaje ? "is-invalid" : ""
                                                    }`}
                                                    rows="5"
                                                    value={formData.mensaje}
                                                    onChange={handleChange}
                                                    placeholder="Tu mensaje aquí"
                                                ></textarea>
                                                {errors.mensaje && (
                                                    <div className="invalid-feedback">
                                                        {errors.mensaje}
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-lg text-white fw-semibold shadow-sm"
                                                style={{
                                                    background:
                                                        "linear-gradient(90deg, #1565c0, #0d47a1)",
                                                    transition:
                                                        "transform 0.3s ease, box-shadow 0.3s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.05)"
                                                    e.currentTarget.style.boxShadow =
                                                        "0 6px 14px rgba(0,0,0,0.25)"
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)"
                                                    e.currentTarget.style.boxShadow = ""
                                                }}
                                            >
                                                <i className="fas fa-paper-plane me-2"></i>Enviar
                                            </button>
                                        </form>

                                        {mostrarModal && (
                                            <Modal trigger={mostrarModal} onClose={handleCloseModal}>
                                                <div className="p-4">
                                                    <h5>Mensaje enviado</h5>
                                                    <p>Nos pondremos en contacto contigo a la brevedad.</p>
                                                </div>
                                            </Modal>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contacto
