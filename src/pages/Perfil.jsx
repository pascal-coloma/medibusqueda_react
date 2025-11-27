import { useEffect, useContext, useState } from "react"
import NavBar from "../components/NavBar"
import "../pages/Perfil.css"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../components/LoginContext"
import Popup from "../components/modal"
import EditarPerfil from "../components/EditarPerfil"
import { traerCiudades } from "../Api/ApiCiudad"
import Mapa from "../components/mapa"

function capitalizarNombreCompleto(str) {
    if (!str) return ""
    return str
        .split(" ")
        .map(
            (palabra) =>
                palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
        )
        .join(" ")
}

function Perfil() {
    const navegador = useNavigate()
    const { logout, usuario, login } = useContext(LoginContext)

    const busquedasGuardadas = JSON.parse(
        localStorage.getItem("busquedasRecientes") || "[]"
    )

    const [showMap, setShowMap] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [perfil, setPerfil] = useState({
        username: "",
        profileImage: "",
        ciudad: "0"
    })

    const busquedasUnicas = Array.from(
        new Set(
            busquedasGuardadas
                .map((b) => (b || "").trim())
                .filter((b) => b.length > 0)
        )
    )

    const ciudadPorDefecto =
        (usuario && usuario.ciudad && usuario.ciudad.id_ciudad
            ? String(usuario.ciudad.id_ciudad)
            : localStorage.getItem("ciudad")) || "0"

    useEffect(() => {
        if (!usuario) {
            const timer = setTimeout(() => {
                navegador("/login")
            }, 3500)
            return () => clearTimeout(timer)
        } else {
            // Nombre/foto inmediatos
            setPerfil((prev) => ({
                ...prev,
                username: usuario.nombre || "",
                profileImage: usuario.profileImage || "",
                ciudad: usuario.ciudad?.id_ciudad
                    ? String(usuario.ciudad.id_ciudad)
                    : prev.ciudad || "0"
            }))

            // Resolver ciudad y recién luego mostrar mapa
            traerCiudades().then((ciudades) => {
                const ciudadUsuario = ciudades.find((c) =>
                    c.usuarios.some((u) => u.correo === usuario.correo)
                )
                setPerfil((prev) => ({
                    ...prev,
                    ciudad: ciudadUsuario ? String(ciudadUsuario.id_ciudad) : "0"
                }))
                setShowMap(true)
            })
        }
    }, [usuario, navegador])

    const handleLogout = () => {
        logout()
        navegador("/login")
    }

    if (!usuario) {
        return (
            <>
                <NavBar />

                <main
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        minHeight: "80vh",
                        color: "var(--text-main)"
                    }}
                >
                    <div
                        className="card p-3 p-md-4 shadow-lg rounded-4 animate__animated animate__fadeInUp"
                        style={{
                            maxWidth: "420px",
                            width: "100%",
                            background: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid rgba(148, 163, 184, 0.35)",
                            color: "var(--text-main)"
                        }}
                    >
                        <h2
                            className="text-center mb-3 fw-bold"
                            style={{ color: "var(--text-main)" }}
                        >
                            Acceso restringido
                        </h2>

                        <p
                            className="text-center mb-4"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Debes iniciar sesión para acceder a tu perfil y a tus
                            búsquedas recientes.
                        </p>

                        <button
                            type="button"
                            className="btn w-100 py-2 mb-2"
                            style={{
                                background: "linear-gradient(135deg, var(--primary), #2563eb)",
                                border: "none",
                                borderRadius: "999px",
                                fontWeight: "600",
                                color: "#f9fafb",
                                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.75)"
                            }}
                            onClick={() => navegador("/login")}
                        >
                            Ir a iniciar sesión
                        </button>

                        <p
                            className="text-center small mb-0"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Serás redirigido automáticamente en unos segundos…
                        </p>
                    </div>
                </main>
            </>
        )
    }


    const displayName =
        capitalizarNombreCompleto(perfil.username) || "Usuario"

    const fotoPerfil =
        perfil.profileImage ||
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fcd%2Fac%2F8a%2Fcdac8a9d6bb1b43f52fefb4607e182ef.jpg&f=1&nofb=1&ipt=7e81db28a24a2aaf67d2f5982f50145c4ac4cf64587b301017bbff6734e8a77b"

    return (
        <>
            <NavBar />

            <div className="perfil-page-wrapper">
                {!showMap && (
                    <div className="loading-overlay">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando…</span>
                        </div>
                    </div>
                )}

                <div className={!showMap ? "blur-content" : ""}>
                    <div className="perfil-hero">
                        <div className="container py-5">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-10">
                                    <div className="perfil-glass-card">
                                        <div className="row g-4 align-items-stretch">
                                            {/* Columna izquierda: perfil */}
                                            <div className="col-12 col-lg-5 d-flex">
                                                <div className="perfil-info-card">
                                                    <div className="perfil-avatar-wrapper">
                                                        <div className="perfil-avatar-ring">
                                                            <img
                                                                src={fotoPerfil}
                                                                alt="Foto de perfil"
                                                                className="perfil-avatar-img"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="perfil-text">
                                                        <span className="perfil-label">
                                                            Mi perfil
                                                        </span>
                                                        <h2 className="perfil-title">
                                                            Bienvenido/a, {displayName}
                                                        </h2>
                                                        <p className="perfil-email">
                                                            {usuario.correo}
                                                        </p>

                                                        <div className="perfil-actions">
                                                            <button
                                                                className="btn btn-light perfil-btn"
                                                                onClick={() => setOpenModal(true)}
                                                            >
                                                                Editar perfil
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-light perfil-btn"
                                                                onClick={handleLogout}
                                                            >
                                                                Cerrar sesión
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {openModal && (
                                                        <Popup
                                                            trigger={openModal}
                                                            onClose={() => setOpenModal(false)}
                                                        >
                                                            <EditarPerfil
                                                                initialUsername={perfil.username}
                                                                initialCiudad={perfil.ciudad}
                                                                initialImage={perfil.profileImage}
                                                                onCancel={() => setOpenModal(false)}
                                                                onSave={(data) => {
                                                                    const nuevoPerfil = {
                                                                        ...usuario,
                                                                        nombre: data.username,
                                                                        profileImage: data.profileImage || "",
                                                                        ciudad: data.ciudad || "0"
                                                                    }
                                                                    login(nuevoPerfil)
                                                                    setOpenModal(false)
                                                                }}
                                                            />
                                                        </Popup>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Columna derecha: búsquedas */}
                                            <div className="col-12 col-lg-7 d-flex">
                                                <div className="perfil-search-card">
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <h5 className="perfil-search-title">
                                                            Búsquedas recientes
                                                        </h5>
                                                        {busquedasUnicas.length > 0 && (
                                                            <span className="perfil-chip">
                                                                {busquedasUnicas.length} búsqueda
                                                                {busquedasUnicas.length > 1 && "s"}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {busquedasUnicas.length > 0 ? (
                                                        <div className="perfil-search-chips">
                                                            {busquedasUnicas.map((item, index) => (
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    className="perfil-pill"
                                                                    onClick={() =>
                                                                        navegador("/", {
                                                                            state: {
                                                                                medicamentoBuscado: item,
                                                                                ciudadId: ciudadPorDefecto
                                                                            }
                                                                        })
                                                                    }
                                                                >
                                                                    {item}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="perfil-search-empty">
                                                            Aún no tienes búsquedas recientes.
                                                            Empieza buscando un medicamento para
                                                            verlo aquí.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Map debajo de la tarjeta principal */}
                                    <div className="perfil-map-wrapper mt-4">
                                        {showMap && <Mapa initialCiudad={perfil.ciudad} />}
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

export default Perfil
