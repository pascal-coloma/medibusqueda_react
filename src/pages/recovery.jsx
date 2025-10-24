import React, { useState } from "react";
import Modal from "../components/modal.jsx";
import NavBar from "../components/NavBar";
import { obtainUsers } from "../Api/ApiUsers";
import Footer from "../components/Footer.jsx";


function Recovery() {
    const [showModalCode, setShowModalCode] = useState(false);
    const [showModalPass, setShowModalPass] = useState(false);
    const [user, setUser] = useState("");
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");
    const [newPass, setNewPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [passError, setPassError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const validar = async (e) => {
        e.preventDefault();
        setSuccessMsg("");

        const inputUser = user.trim();
        if (!inputUser) {
            setCodeError("Ingrese su correo o usuario");
            return;
        }

        let usuariosResp;
        try {
            usuariosResp = await obtainUsers();
        } catch (err) {
            console.error(err);
            setCodeError("Error al obtener usuarios. Intente más tarde.");
            return;
        }

        const lista = usuariosResp?.usuarios || usuariosResp?.users || [];
        const usuarioEncontrado = lista.find(u => u.correo === inputUser || u.nombre === inputUser);

        if (!usuarioEncontrado) {
            setCodeError("Usuario no encontrado");
            return;
        }

        setCode("");
        setCodeError("");
        setShowModalCode(true);
    }

    const handleCodeContinue = () => {
        setCodeError("");
        if (code.length !== 6 || isNaN(Number(code))) {
            setCodeError("El código debe tener 6 dígitos numéricos");
            return;
        }
        setShowModalPass(true);
    }

    const handleConfirmNewPassword = () => {
        setPassError("");
        const MIN_PASS = 8;
        if (newPass.length < MIN_PASS) {
            setPassError(`La contraseña debe tener al menos ${MIN_PASS} caracteres`);
            return;
        }
        if (newPass !== repeatPass) {
            setPassError("Las contraseñas no coinciden");
            return;
        }

        setSuccessMsg("Contraseña actualizada con éxito ✅");
        setShowModalPass(false);
        setShowModalCode(false);
        setNewPass("");
        setRepeatPass("");
        setUser("");
    }

    return (
        <>
            <NavBar />

            <div className="d-flex justify-content-center align-items-center py-5" style={{ backgroundColor: "#caf8f2" }}>
                <div className="card p-4 p-md-5 shadow-lg rounded-4 animate__animated animate__fadeInUp" style={{ maxWidth: 500, width: "100%" }}>
                    <h2 className="text-center mb-4 text-primary fw-bold">Recuperar contraseña</h2>

                    {successMsg && <div className="alert alert-success text-center">{successMsg}</div>}

                    <form onSubmit={validar}>
                        <div className="mb-3">
                            <label htmlFor="correoRecuperar" className="form-label fw-semibold">Correo o usuario</label>
                            <input
                                type="text"
                                id="correoRecuperar"
                                className="form-control rounded-pill"
                                placeholder="Ingrese su correo o usuario"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                            {codeError && <small className="text-danger">{codeError}</small>}
                            <div className="form-text">Nunca compartiremos su correo electrónico con nadie.</div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold shadow-sm mt-3">
                            Recuperar contraseña
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal código */}
            <Modal trigger={showModalCode} backdropBlur={true} animation="animate__fadeInDown">
                <div className="card p-3 rounded-4 shadow animate__animated animate__fadeInUp">
                    <div className="modal-header">
                        <h5 className="modal-title">Ingresar código</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModalCode(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Ingrese un código que le fue enviado a su correo</p>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        {codeError && <div className="text-danger mt-2">{codeError}</div>}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary rounded-pill" onClick={handleCodeContinue}>Continuar</button>

                        {/* Modal nueva contraseña */}
                        <Modal trigger={showModalPass} backdropBlur={true} animation="animate__fadeInUp">
                            <div className="card p-3 rounded-4 shadow animate__animated animate__fadeInUp">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nueva contraseña</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModalPass(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Nueva contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control rounded-pill"
                                            placeholder="Ingrese su nueva contraseña"
                                            value={newPass}
                                            onChange={(e) => setNewPass(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Repetir contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control rounded-pill"
                                            placeholder="Repita su contraseña"
                                            value={repeatPass}
                                            onChange={(e) => setRepeatPass(e.target.value)}
                                        />
                                    </div>
                                    {passError && <div className="text-danger">{passError}</div>}
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary rounded-pill" onClick={handleConfirmNewPassword}>Confirmar</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </Modal>
            <Footer/>
        </>
    );
}

export default Recovery;
