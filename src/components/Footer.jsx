import './Footer.css';

function Footer() {
    return (
        <footer className="footer py-3 shadow-sm">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <a href="/" className="d-flex align-items-center mb-2 mb-md-0 text-decoration-none">
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F011%2F057%2F192%2Fnon_2x%2Fmagnifying-glass-or-search-icon-magnifier-glass-sign-vector.jpg&f=1&nofb=1&ipt=f83efa21b5b2a393fdc129f11b830ae912c8c3af3fcd7ff28d4d299bfd0294ac"
                        alt="logo_medbus"
                        width="40"
                        height="40"
                        className="me-2"
                    />
                    <span className="fw-bold text-primary">MediBusqueda</span>
                </a>
                <span className="text-muted">&copy; 2025 MediBusqueda. Todos los derechos reservados.</span>
            </div>
        </footer>
    );
}

export default Footer;
