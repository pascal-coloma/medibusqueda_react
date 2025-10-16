
import React, { useState } from "react";
import Modal from "../components/modal.jsx";
import NavBar from "../components/NavBar";



function Recovery() {
    const [botonPopup, setBotonPopup] = useState(false);
    const [botonPopup2, setBotonPopup2] = useState(false);
    return (
        <>
            <NavBar />
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h1>Recuperar contraseña</h1>
                <p>Página de recuperación de contraseña</p>
                <label htmlFor="correoRecuperar" className="form-label"><strong>Email</strong></label>
                <input type="email" className="form-control" id="correoRecuperar" aria-describedby="emailHelp" placeholder="ingrese su email" />
                <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
            </div>
            <button onClick={() => setBotonPopup(true)} className="btn btn-primary">Poppuptest</button>
            <Modal trigger={botonPopup}>
                <div class="modal-header">
                    <h1 className="modal-title fs-5" >Recuperar contraseña</h1>
                <button type="button" class="btn-close" onClick={() => setBotonPopup(false)}></button>
                </div>
                <div class="modal-body">
                    ingrese un codigo que le fue enviado a su correo
                    <input type="text" className="form-control"/>

                </div>
                <div style={{ marginTop: "2rem" }}>
                    <button className="close btn btn-secondary" onClick={() => setBotonPopup2(true)}>Next</button>
                        <Modal trigger={botonPopup2}>
                            <div class="modal-header">
                                <h1 class="modal-title fs-5">Recuperar contraseña</h1>
                                <button type="button" class="btn-close" onClick={() => setBotonPopup2(false) || setBotonPopup(false)}></button>
                            </div>
                            <div class="modal-body">
                            <div class="mb-3">
                                <label className="form-label"><strong>Ingrese su nueva contraseña</strong></label>
                                <input className="form-control" placeholder="ingrese su nueva contraseña"/>
                            </div>
                            <div class="mb-3">
                                <label className="form-label"><strong>Repetir contraseña</strong></label>
                                <input className="form-control" placeholder="Repita su contraseña"/>
                            </div>
                            </div>
                            <p>elefante volador</p>
                            <button className="close btn btn-secondary" onClick={() => setBotonPopup2(false) || setBotonPopup(false)}>cerrar </button>
                        </Modal>
                </div>
            </Modal>
        </>
    );
}

export default Recovery