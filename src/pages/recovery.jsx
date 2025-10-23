
import React, { useState } from "react";
import Modal from "../components/modal.jsx";
import NavBar from "../components/NavBar";
import { obtainUsers } from "../Api/ApiUsers"



function Recovery() {
    const [botonPopup, setBotonPopup] = useState(false);
    const [botonPopup2, setBotonPopup2] = useState(false);
    const [user, setUser] = useState("")
    const [code, setCode] = useState("")
    const [codeError, setCodeError] = useState("")
    const [newPass, setNewPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const [passError, setPassError] = useState("")

    const validar = async (e) => {
        e.preventDefault();

        const inputUser = user.trim();

        if (!inputUser) {
            alert('Ingrese su correo o usuario');
            return;
        }

        let usuariosResp;
        try {
            usuariosResp = await obtainUsers();
        } catch (err) {
            console.error(err);
            alert('Error al obtener usuarios. Intente más tarde.');
            return;
        }

        const lista = usuariosResp && (usuariosResp.usuarios || usuariosResp.users) || [];

        const usuarioEncontrado = lista.find(u => (u.correo === inputUser || u.nombre === inputUser));

        if (!usuarioEncontrado) {
            alert("Usuario no encontrado");
            return;
        }

        // abrir primer modal para solicitar código
        setCode("");
        setCodeError("");
        setBotonPopup(true);
    }

    const handleCodeContinue = () => {
        setCodeError("");
        if (code.length !== 6) {
            setCodeError('El código debe tener 6 dígitos numéricos');
            return;
        }
        setBotonPopup2(true);
        setBotonPopup(false);
        
    }

    const handleConfirmNewPassword = () => {
        setPassError("");
        const MIN_PASS = 8 
        if (newPass.length < MIN_PASS) {
            setPassError(`La contraseña debe tener al menos ${MIN_PASS} caracteres`);
            return;
        }
        if (newPass !== repeatPass) {
            setPassError('Las contraseñas no coinciden');
            return;
        }

        alert('Contraseña actualizada con éxito');
        setBotonPopup2(false);
        setBotonPopup(false);
        setNewPass("");
        setRepeatPass("");
        setUser("");
    }

    return (
        <>
            <NavBar />
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h1>Recuperar contraseña</h1>
                <p>Página de recuperación de contraseña</p>
                <label htmlFor="correoRecuperar" className="form-label"><strong>Email</strong></label>
                <input type="text" id="correoRecuperar" className="form-control" aria-describedby="passwordHelpBlock"
                        placeholder="Ingrese su usuario" value={user} onChange={(e) => setUser(e.target.value)} />
                <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie.</div>
            </div>
            <button onClick={validar} className="btn btn-primary">Recuperar contraseña</button>
            <Modal trigger={botonPopup}>
                <div className="modal-header">
                    <h1 className="modal-title fs-5">Recuperar contraseña</h1>
                    <button type="button" className="btn-close" onClick={() => setBotonPopup(false)}></button>
                </div>
                <div className="modal-body">
                    <p>Ingrese un código que le fue enviado a su correo</p>
                    <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
                    {codeError && <div className="text-danger mt-2">{codeError}</div>}
                </div>
                <div style={{ marginTop: "2rem" }}>
                    <button className="btn btn-secondary" onClick={handleCodeContinue}>Continuar</button>
                    <Modal trigger={botonPopup2}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Recuperar contraseña</h1>
                            <button type="button" className="btn-close" onClick={() => { setBotonPopup2(false); setBotonPopup(false); }}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label"><strong>Ingrese su nueva contraseña</strong></label>
                                <input className="form-control" placeholder="ingrese su nueva contraseña" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>Repetir contraseña</strong></label>
                                <input className="form-control" placeholder="Repita su contraseña" value={repeatPass} onChange={(e) => setRepeatPass(e.target.value)} />
                            </div>
                            {passError && <div className="text-danger">{passError}</div>}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={handleConfirmNewPassword}>Confirmar</button>
                        </div>
                    </Modal>
                </div>
            </Modal>
        </>
    );
}

export default Recovery