import React, { useState } from "react";
import Modal from "../components/modal.jsx";
import NavBar from "../components/NavBar";
import { getUserByCorreo, actualizarUsuario } from "../Api/ApiUsers";
import "./Perfil.css";
import { useNavigate } from "react-router-dom";


function Recovery() {

    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [foundUser, setFoundUser] = useState(null);

    const [rutFirst8, setRutFirst8] = useState("");
    const [digitosRut, setDigitosRut] = useState("");

    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");

    const [newPass, setNewPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [passError, setPassError] = useState("");

    const [showCodeModal, setShowCodeModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);

    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

    const validar = async (e) => {
        e.preventDefault();
        if (!user.trim()) {
            setCodeError("Ingrese un correo válido");
            return;
        }

        try {
            const u = await getUserByCorreo(user.trim());
            if (!u) {
                setCodeError("Usuario no encontrado");
                return;
            }

            const rut = String(u.rut || u.RUT || "").replace(/\D/g, "");
            setFoundUser(u);
            setRutFirst8(rut.slice(0, 8));
            setDigitosRut(rut);

            setCode("");
            setCodeError("");
            setShowCodeModal(true);
        } catch {
            setCodeError("Error al consultar usuario. Intente más tarde.");
        }
    };

    const handleConfirmNewPassword = async () => {
        setPassError("");

        if (newPass.length < 8) {
            setPassError("La contraseña debe tener al menos 8 caracteres");
            return;
        }
        if (newPass !== repeatPass) {
            setPassError("Las contraseñas no coinciden");
            return;
        }

        const payload = {
            rut: rutFirst8,
            dv_rut: foundUser.dv_rut || foundUser.dv || "",
            pnombre: foundUser.pnombre,
            snombre: foundUser.snombre,
            apaterno: foundUser.apaterno,
            amaterno: foundUser.amaterno,
            correo: foundUser.correo,
            clave: newPass,
            ciudad: { id_ciudad: Number(foundUser?.ciudad?.id_ciudad ?? 1) }
        };

        try {
            await actualizarUsuario(rutFirst8, payload);

            setShowSuccessOverlay(true);
            setTimeout(() => {
                setShowSuccessOverlay(false);
                setShowPassModal(false);
                setShowCodeModal(false);
                navigate('/login')
            }, 2000);

        } catch (err) {
            console.error(err);
            setPassError("Error al actualizar la contraseña.");
        }
    };

    return (
        <>
            <NavBar />

            <div className="perfil-page-wrapper d-flex justify-content-center align-items-center">

                <div className="perfil-glass-card" style={{ maxWidth: "480px", width: "100%" }}>
                    <h1 className="text-center mb-3" style={{ color: "#f9fafb" }}>
                        Recuperación de contraseña
                    </h1>

                    <p className="text-center mb-4" style={{ color: "#cbd5e1" }}>
                        Ingresa tu correo para comenzar el proceso
                    </p>

                    <label className="form-label" style={{ color: "#e2e8f0" }}>
                        Correo electrónico
                    </label>

                    <input
                        type="email"
                        className="form-control rounded-pill mb-3"
                        placeholder="tuemail@ejemplo.com"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        style={{
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(148,163,184,0.3)",
                            color: "#f3f4f6"
                        }}
                    />

                    {codeError && (
                        <div className="text-danger text-center mb-2">{codeError}</div>
                    )}

                    <button
                        onClick={validar}
                        className="perfil-btn btn-primary w-100 rounded-pill mt-2"
                        style={{ paddingBlock: "0.65rem" }}
                    >
                        Recuperar contraseña
                    </button>
                </div>
            </div>

            <Modal trigger={showCodeModal}>
                <div className="perfil-glass-card" style={{ padding: "2rem" }}>

                    <div className="d-flex justify-content-between">
                        <h2 style={{ color: "#f9fafb" }}>Verificación</h2>
                        <button className="btn-close" onClick={() => setShowCodeModal(false)} />
                    </div>

                    <p style={{ color: "#cbd5e1" }}>
                        Ingrese el código enviado a su correo
                    </p>

                    <input
                        type="text"
                        maxLength={6}
                        className="form-control text-center rounded-pill"
                        placeholder="Código de 6 dígitos"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(148,163,184,0.3)",
                            color: "#f3f4f6"
                        }}
                    />

                    {codeError && <div className="text-danger mt-2">{codeError}</div>}

                    <button
                        className="perfil-btn btn-outline-light w-100 rounded-pill mt-3"
                        onClick={() => {
                            if (/^\d{6}$/.test(code)) setShowPassModal(true);
                            else setCodeError("Código inválido");
                        }}
                    >
                        Continuar
                    </button>
                </div>
            </Modal>

            <Modal trigger={showPassModal}>
                <div className="perfil-glass-card" style={{ padding: "2rem" }}>

                    <div className="d-flex justify-content-between">
                        <h2 style={{ color: "#f9fafb" }}>Nueva contraseña</h2>
                        <button
                            className="btn-close"
                            onClick={() => setShowPassModal(false)}
                        />
                    </div>

                    <label className="form-label mt-2" style={{ color: "#e2e8f0" }}>
                        Nueva contraseña
                    </label>

                    <div className="input-group mb-3">
                        <input
                            type={showPass1 ? "text" : "password"}
                            className="form-control rounded-start-pill"
                            placeholder="Mínimo 8 caracteres"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(148,163,184,0.3)",
                                color: "#f3f4f6"
                            }}
                        />
                        <button
                            className="btn btn-outline-light rounded-end-pill"
                            onClick={() => setShowPass1(!showPass1)}
                        >
                            {showPass1 ? "Ocultar" : "Ver"}
                        </button>
                    </div>

                    <label className="form-label" style={{ color: "#e2e8f0" }}>
                        Repetir contraseña
                    </label>

                    <div className="input-group mb-3">
                        <input
                            type={showPass2 ? "text" : "password"}
                            className="form-control rounded-start-pill"
                            placeholder="Repita la contraseña"
                            value={repeatPass}
                            onChange={(e) => setRepeatPass(e.target.value)}
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(148,163,184,0.3)",
                                color: "#f3f4f6"
                            }}
                        />
                        <button
                            className="btn btn-outline-light rounded-end-pill"
                            onClick={() => setShowPass2(!showPass2)}
                        >
                            {showPass2 ? "Ocultar" : "Ver"}
                        </button>
                    </div>

                    {passError && (
                        <div className="text-danger text-center mb-3">{passError}</div>
                    )}

                    <button
                        className="perfil-btn btn-primary w-100 rounded-pill"
                        onClick={handleConfirmNewPassword}
                        style={{ paddingBlock: "0.6rem" }}
                    >
                        Confirmar
                    </button>
                </div>
            </Modal>

            {showSuccessOverlay && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        background: "rgba(15,23,42,0.55)",
                        backdropFilter: "blur(6px)",
                        zIndex: 2000
                    }}
                >
                    <div
                        className="perfil-glass-card text-center"
                        style={{ padding: "2rem", maxWidth: "360px", width: "90%" }}
                    >
                        <h2 style={{ color: "#22c55e" }}>
                            Contraseña actualizada
                        </h2>
                        <p style={{ color: "#e2e8f0" }}>
                            Tu contraseña fue cambiada con éxito
                        </p>

                        <div
                            className="spinner-border text-primary mt-3"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Recovery;
