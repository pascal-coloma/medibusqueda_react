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

    <div classNameName="container" id="conte_footer">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <a href="/">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F011%2F057%2F192%2Fnon_2x%2Fmagnifying-glass-or-search-icon-magnifier-glass-sign-vector.jpg&f=1&nofb=1&ipt=f83efa21b5b2a393fdc129f11b830ae912c8c3af3fcd7ff28d4d299bfd0294ac"
                        alt="logo_medbus" width="30" height="30"/>
                </a>
                <span className="text-muted">© 2025 MediBusqueda</span>
            </div>
        </footer>
    </div>
     </>
    )
}

export default Login