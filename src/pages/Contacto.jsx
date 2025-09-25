import NavBar from "../components/NavBar"

function Contacto() {
    return (
        <>
            <NavBar />
            <div class="container p-5">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="contact-wrapper">
                            <div class="row g-0">
                                <div class="col-md-5">
                                    <div class="contact-info h-100">
                                        <h3 class="mb-4">Ponte en contacto</h3>
                                        <p class="mb-4">Nos encantaria conocer tus opiniones o comentarios,
                                            contactanos con los datos de abajo o rellena el formulario y te daremos respuesta lo
                                            antes posible
                                        </p>

                                        <div class="contact-item">
                                            <div class="contact-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-0">Direccion</h6>
                                                <p class="mb-0">Av. Alvarez 1335<br />Vina del Mar, Valparaiso</p>
                                            </div>
                                        </div>

                                        <div class="contact-item">
                                            <div class="contact-icon">
                                                <i class="fas fa-phone"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-0">Fono</h6>
                                                <p class="mb-0">+569 12 35 67 89 </p>
                                            </div>
                                        </div>

                                        <div class="contact-item">
                                            <div class="contact-icon">
                                                <i class="fas fa-envelope"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-0">Email</h6>
                                                <p class="mb-0">contacto@medibusqueda.com</p>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <div class="col-md-7">
                                    <div class="contact-form">
                                        <h3 class="mb-4">Envianos un mensaje</h3>
                                        <form class="formularioContacto">
                                            <div class="row">
                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label">Nombre</label>
                                                    <input type="text" class="form-control" placeholder="Juan" />
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label">Apellidos</label>
                                                    <input type="text" class="form-control" placeholder="Perez Beltran" />
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label">Correo electronico</label>
                                                <input type="email" class="form-control" placeholder="juan@ejemplo.com" />
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label">Asunto</label>
                                                <input type="text" class="form-control" placeholder="Como podemos ayudar?" />
                                            </div>

                                            <div class="mb-4">
                                                <label class="form-label">Mensaje</label>
                                                <textarea class="form-control" rows="5"
                                                    placeholder="Tu mensaje aqui"></textarea>
                                            </div>

                                            <button type="submit" id="botonContacto"
                                                class="btn btn-submit text-white">Enviar</button>
                                        </form>
                                        <div class="modal fade" id="formularioEnviado" aria-hidden="true"
                                            aria-labelledby="formularioEnviado" tabindex="-1">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="formularioEnviado">Recuperar contraseña</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close" id="modal-btn-close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Gracias por contactarnos, te responderemos a la brevedad</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="map-container"></div>
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