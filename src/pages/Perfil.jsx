import { useEffect, useContext, useState } from "react"
import NavBar from "../components/NavBar"
import "../pages/Perfil.css"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../components/LoginContext"
import Popup from "../components/modal"
import EditarPerfil from "../components/EditarPerfil"
import Mapa from "../components/mapa"

function storageKey(correo) {
    return `perfil_${correo}`
}

function loadPerfil(correo) {
    if (!correo) return null
    const raw = localStorage.getItem(storageKey(correo))
    if (!raw) return null
    try {
        return JSON.parse(raw)
    } catch {
        return null
    }
}

function savePerfil(correo, data) {
    if (!correo) return
    localStorage.setItem(storageKey(correo), JSON.stringify(data))
}

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
    const { logout, usuario } = useContext(LoginContext)

    const [openModal, setOpenModal] = useState(false)
    const [perfil, setPerfil] = useState({
        username: "",
        profileImage: "",
        ciudad: "0"
    })

    useEffect(() => {
        if (!usuario) {
            const timer = setTimeout(() => {
                navegador("/login")
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [usuario, navegador])

    useEffect(() => {
        if (!usuario) return
        const stored = loadPerfil(usuario.correo)
        if (stored) {
            setPerfil({
                username: stored.username || "",
                profileImage: stored.profileImage || "",
                ciudad: stored.ciudad || "0"
            })
        } else {
            setPerfil({
                username: usuario.nombre || "",
                profileImage: usuario.profileImage || "",
                ciudad: "0"
            })
        }
    }, [usuario])

    const handleLogout = () => {
        logout()
        navegador("/login")
    }

    if (!usuario) {
        return <h1>No existe usuario registrado</h1>
    }

    const displayName =
        capitalizarNombreCompleto(perfil.username || usuario.nombre) || "Usuario"

    const fotoPerfil =
        perfil.profileImage ||
        usuario.profileImage ||
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fcd%2Fac%2F8a%2Fcdac8a9d6bb1b43f52fefb4607e182ef.jpg&f=1&nofb=1&ipt=7e81db28a24a2aaf67d2f5982f50145c4ac4cf64587b301017bbff6734e8a77b"

    return (
        <>
            <NavBar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-sm rounded-4 p-4 bg-light">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img
                                    src={fotoPerfil}
                                    alt="Foto de perfil"
                                    className="rounded-circle shadow mb-3"
                                    style={{
                                        width: "130px",
                                        height: "130px",
                                        objectFit: "cover"
                                    }}
                                />
                                <h3 className="fw-bold mb-1">
                                    Bienvenido, {displayName}
                                </h3>
                                <p className="text-muted">{usuario.correo}</p>
                                <div className="d-flex gap-2 mt-3">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setOpenModal(true)}
                                    >
                                        Editar perfil
                                    </button>
                                    <button
                                        className="btn btn-primary"
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
                                        initialUsername={perfil.username || usuario.nombre || ""}
                                        initialCiudad={perfil.ciudad || "0"}
                                        initialImage={perfil.profileImage || usuario.profileImage || ""}
                                        onCancel={() => setOpenModal(false)}
                                        onSave={(data) => {
                                            const nuevoPerfil = {
                                                username: data.username,
                                                profileImage: data.profileImage || "",
                                                ciudad: data.ciudad || "0"
                                            }
                                            setPerfil(nuevoPerfil)
                                            savePerfil(usuario.correo, nuevoPerfil)
                                            setOpenModal(false)
                                        }}
                                    />
                                </Popup>
                            )}
                        </div>

                        <div className="card shadow-sm rounded-4 p-4 mt-4 bg-light">
                            <h5 className="fw-bold mb-3">Búsquedas recientes</h5>
                            <ul className="list-group list-group-flush">
                                {JSON.parse(
                                    localStorage.getItem("busquedasRecientes") || "[]"
                                ).length > 0 ? (
                                    JSON.parse(
                                        localStorage.getItem("busquedasRecientes")
                                    ).map((item, index) => (
                                        <li key={index} className="list-group-item">
                                            {item}
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item text-muted">
                                        No hay búsquedas recientes
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Mapa />
        </>
    )
}

export default Perfil
