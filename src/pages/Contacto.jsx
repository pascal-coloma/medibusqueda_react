import { useState } from "react"
import Mapa from "../components/mapa"
import NavBar from "../components/NavBar"
import Modal from "../components/modal"

function Contacto() {
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        //ALERTA aqui tengo que hacer las validaciones del formulario tenganme paciencia
        setShowModal(true)
    }
    return (
        <>
            <NavBar />
            <div className="container p-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="contact-wrapper">
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <div className="contact-info h-100">
                                        <h3 className="mb-4">Ponte en contacto</h3>
                                        <p className="mb-4">Nos encantaria conocer tus opiniones o comentarios,
                                            contactanos con los datos de abajo o rellena el formulario y te daremos respuesta lo
                                            antes posible
                                        </p>

                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Direccion</h6>
                                                <p className="mb-0">Av. Alvarez 1335<br />Vina del Mar, Valparaiso</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="fas fa-phone"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Fono</h6>
                                                <p className="mb-0">+569 12 35 67 89 </p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="fas fa-envelope"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Email</h6>
                                                <p className="mb-0">contacto@medibusqueda.com</p>
                                            </div>
                                        </div>
                                        <Mapa initialCiudad="0" />
                                    </div>
                                </div>

                                
                                <div className="col-md-7">
                                    <div className="contact-form">
                                        <h3 className="mb-4">Envianos un mensaje</h3>
                                        <form className="formularioContacto" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Nombre</label>
                                                    <input type="text" className="form-control" placeholder="Juan" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Apellidos</label>
                                                    <input type="text" className="form-control" placeholder="Perez Beltran" />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Correo electronico</label>
                                                <input type="email" className="form-control" placeholder="juan@ejemplo.com" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Asunto</label>
                                                <input type="text" className="form-control" placeholder="Como podemos ayudar?" />
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label">Mensaje</label>
                                                <textarea className="form-control" rows="5"
                                                    placeholder="Tu mensaje aqui"></textarea>
                                            </div>

                                            <button type="submit" id="botonContacto"
                                                className="btn btn-submit text-white">Enviar</button>
                                        </form>
                                        <Modal trigger={showModal}>
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="formularioEnviado">Solicitud contacto</h1>
                                            </div>
                                            <div className="modal-body">
                                                <p>Gracias por contactarnos, te responderemos a la brevedad</p>
                                            </div>
                                            <button className="btn btn-submit text-white" onClick={() => setShowModal(false)}>Cerrar</button>
                                            <div className="modal-footer">
                                                <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
                                            </div>
                                        </Modal>
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