import { useEffect } from "react"
import NavBar from "./NavBar"
import { useNavigate } from "react-router-dom"

function Perfil() {
    const navegador = useNavigate()
    let usuario = localStorage.getItem("user")

    // constante handlesubmit con funcion asincrona, previniendo el default
    // utilizar fetch y await par atraer los datos de la API
    // foundUser = data.{llave}.find 

    useEffect(() => {
        if(!usuario){
            const timer = setTimeout(() => {
                navegador("/login")
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [usuario])

    const logout = () => {
        localStorage.removeItem('user')
        usuario = null
    }

    if (usuario) {
        const correo = localStorage.getItem("email")
        return (
        <>
            <NavBar />
            <div class="container-fluid">
                <section class="hero-section mb-5 mt-5">
                    <div class="container" id="conte-hero">
                        <div class="row align-items-center ">
                            <div class="col-md-4"></div>
                            <div class="perfilusr col-md-4 text-center">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fcd%2Fac%2F8a%2Fcdac8a9d6bb1b43f52fefb4607e182ef.jpg&f=1&nofb=1&ipt=7e81db28a24a2aaf67d2f5982f50145c4ac4cf64587b301017bbff6734e8a77b"
                                    class="rounded-circle  img-fluid hero-image " />
                                <h2 id="welcome">Bienvenido, {usuario}</h2>
                                <h3> Correo : {correo} </h3>
                                <button type="button" class="btn btn-primary" onClick={logout}>Cerrar sesion</button>
                            </div>
                            <div class="col-md-4">
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
        )
    } else{
        return (
            <h1>No existe usuario registrado</h1>
        )
    }
}

export default Perfil