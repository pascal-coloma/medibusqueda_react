import { useEffect, useContext, useState } from "react"
import NavBar from "../components/NavBar"
import "../pages/Perfil.css"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../components/LoginContext"
import Popup from "../components/modal"
import EditarPerfil from "../components/EditarPerfil"
import Mapa from "../components/mapa"


function Perfil() {
    const navegador = useNavigate()
    const { logout, usuario } = useContext(LoginContext)
    let fotoPerfil = usuario?.profileImage || ''

    const handleLogout = () => {
        logout()
        navegador('/login')
    }

    const [openModal, setOpenModal] = useState(false)
    const [usernameState, setUsernameState] = useState(() => {
        try { return JSON.parse(localStorage.getItem('username') || '""') } catch { return localStorage.getItem('username') || '' }
    })
    const [fotoState, setFotoState] = useState(localStorage.getItem('profileImage') || '')

    function recientes() {
        const reciente = JSON.parse(localStorage.getItem("busquedasRecientes")) || []

        return (
            <>
                {reciente.map((item, index) => (
                    <li>
                        <p key={index}>{item}</p>
                    </li>

                ))}
            </>
        )
    }

    // constante handlesubmit con funcion asincrona, previniendo el default
    // utilizar fetch y await para traer los datos de la API
    // foundUser = data.{llave}.find 

    useEffect(() => {
        if (!usuario) {
            const timer = setTimeout(() => {
                navegador("/registro")
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [usuario])

    if (usuario) {
        return (
            <>
                <NavBar />
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card shadow-sm rounded-4 p-4 bg-light">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img
                                        src={fotoPerfil || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fcd%2Fac%2F8a%2Fcdac8a9d6bb1b43f52fefb4607e182ef.jpg&f=1&nofb=1&ipt=7e81db28a24a2aaf67d2f5982f50145c4ac4cf64587b301017bbff6734e8a77b"}
                                        alt="Foto de perfil"
                                        className="rounded-circle shadow mb-3"
                                        style={{ width: "130px", height: "130px", objectFit: "cover" }}
                                    />
                                    <h3 className="fw-bold mb-1">Bienvenido, {usuario?.nombre || usuario?.correo || "Usuario"}</h3>
                                    <p className="text-muted">{usuario?.correo}</p>
                                    <div className="d-flex gap-2 mt-3">
                                        <button className="btn btn-primary" onClick={handleLogout}>
                                            Cerrar sesión
                                        </button>
                                        <button className="btn btn-secondary" onClick={() => setOpenModal(true)}>
                                            Editar perfil
                                        </button>
                                    </div>
                                </div>
                                {openModal && (
                                    <Popup trigger={openModal} onClose={() => setOpenModal(false)}>
                                        <EditarPerfil
                                            embedded={true}
                                            initialUsername={usernameState}
                                            initialCiudad={localStorage.getItem('ciudad') || ''}
                                            initialImage={fotoState}
                                            onCancel={() => setOpenModal(false)}
                                            onSave={(data) => {
                                                setUsernameState(data.username);
                                                setFotoState(data.profileImage || '');
                                                setOpenModal(false);
                                            }}
                                        />
                                    </Popup>
                                )}
                            </div>

                            <div className="card shadow-sm rounded-4 p-4 mt-4 bg-light">
                                <h5 className="fw-bold mb-3">Búsquedas recientes</h5>
                                <ul className="list-group list-group-flush">
                                    {JSON.parse(localStorage.getItem("busquedasRecientes") || "[]").length > 0 ? (
                                        JSON.parse(localStorage.getItem("busquedasRecientes")).map((item, index) => (
                                            <li key={index} className="list-group-item">{item}</li>
                                        ))
                                    ) : (
                                        <li className="list-group-item text-muted">No hay búsquedas recientes</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <Mapa />
            </>
        )
    } else {
        return (
            <h1>No existe usuario registrado</h1>
        )
    }
}

export default Perfil