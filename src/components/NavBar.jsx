function NavBar() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid" id="barra_nav">
                    <a href="index.html">
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F011%2F057%2F192%2Fnon_2x%2Fmagnifying-glass-or-search-icon-magnifier-glass-sign-vector.jpg&f=1&nofb=1&ipt=f83efa21b5b2a393fdc129f11b830ae912c8c3af3fcd7ff28d4d299bfd0294ac"
                            alt="logo_medbus" width="30" height="30"/>
                    </a>
                    <a class="navbar-brand" href="#">MediBusqueda</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="perfil.html">Perfil</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="contacto.html">Contacto</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="login.html" id="sesionNav">Cerrar Sesion</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar