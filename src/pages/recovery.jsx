
import React, { useState } from "react";
import Modal from "../components/modal.jsx";
import NavBar from "../components/NavBar";



function Recovery() {
    const [botonPopup, setBotonPopup] = useState(false);

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
                <h1>auiwfhaeiufhauifuoahfuifgahf</h1>
                <div style={{ marginTop: "2rem" }}>
                    <button className="close btn btn-secondary" onClick={() => setBotonPopup(false)}>Cerrar</button>
                </div>
            </Modal>
        </>
    );
}

export default Recovery