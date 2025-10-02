import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function Login(){
    //const navegador = navigator()
    return(
        <>
            <NavBar />
            
      <main>
        <div className="LoginUsr">
            <label for="Userlogin" className="form-label"><strong>Usuario</strong></label>
            <input type="text" id="Userlogin" className="form-control" aria-describedby="passwordHelpBlock"
                placeholder="Ingrese su usuario"/>
            
            <label for="passwordLogin" className="form-label"><strong>Contraseña</strong></label>
            <input type="password" id="passwordLogin" className="form-control" aria-describedby="passwordHelpBlock"
                placeholder="Ingrese su contraseña" minlength="8"/>
            <div className="links d-flex flex-column gap-1">
                <a href="registro">Crear cuenta</a>
                <a href="recovery">Olvidé mi contraseña</a>
            </div>
        </div>

        <button type="button" onclick="loginUsr()" className="btn btn-success mx-auto d-block">Enviar</button>
    </main>

    
    <Footer/>
     </>
    )
}

export default Login