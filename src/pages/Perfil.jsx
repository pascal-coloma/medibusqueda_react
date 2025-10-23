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
    let usuario = localStorage.getItem("username")
    let fotoPerfil = localStorage.getItem('profileImage')
    const {logout} = useContext(LoginContext)

    const handleLogout = () => {
        logout()
        navegador('/')
    }

    const [openModal, setOpenModal] = useState(false)
    const [usernameState, setUsernameState] = useState(() => {
        try { return JSON.parse(localStorage.getItem('username') || '""') } catch { return localStorage.getItem('username') || '' }
    })
    const [fotoState, setFotoState] = useState(localStorage.getItem('profileImage') || '')

    function recientes(){
        const reciente = JSON.parse(localStorage.getItem("busquedasrecientes")) || []
        
        return (
            <>
                {reciente.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </>
        )
    }

    // constante handlesubmit con funcion asincrona, previniendo el default
    // utilizar fetch y await para traer los datos de la API
    // foundUser = data.{llave}.find 

    useEffect(() => {
        if(!usuario){
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
            <div className="container-fluid" >
                <section className="hero-section mb-5 mt-5">
                    <div className="container" id="conte-hero">
                        <div className="profile-row">
                            <div className="profile-left">
                                <div className="perfilusr text-left">
                                    <img src={fotoPerfil || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fcd%2Fac%2F8a%2Fcdac8a9d6bb1b43f52fefb4607e182ef.jpg&f=1&nofb=1&ipt=7e81db28a24a2aaf67d2f5982f50145c4ac4cf64587b301017bbff6734e8a77b"}
                                        className="rounded-circle img-fluid hero-image " />
                                    <h2 id="welcome">Bienvenido, {JSON.parse(usuario)}</h2>
                                    <div className="profile-actions">
                                        <button type="button" className="btn btn-primary" onClick={handleLogout}>Cerrar sesión</button>
                                        <button type="button" className="btn btn-secondary" onClick={()=>setOpenModal(true)}>Editar perfil</button>
                                    </div>
                                    {openModal && (
                                        <Popup trigger={openModal}>
                                            <button className="close-btn" onClick={() => setOpenModal(false)}>X</button>
                                            <EditarPerfil
                                                embedded={true}
                                                initialUsername={usernameState}
                                                initialCiudad={localStorage.getItem('ciudad') || ''}
                                                initialImage={fotoState}
                                                onCancel={() => setOpenModal(false)}
                                                onSave={(data) => {
                                                    setUsernameState(data.username)
                                                    setFotoState(data.profileImage || '')
                                                    setOpenModal(false)
                                                }}
                                            />
                                        </Popup>
                                    )}
                                </div>
                            </div>

                            <div className="profile-right">
                                <h4>Busquedas recientes</h4>
                                <hr />
                                {recientes()}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
                <Mapa />
        </>
        )
    } else{
        return (
            <h1>No existe usuario registrado</h1>
        )
    }
}

export default Perfil