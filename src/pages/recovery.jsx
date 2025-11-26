import React, { useState } from "react";
import Modal from "../components/modal.jsx";
import NavBar from "../components/NavBar";
import { getUserByCorreo, actualizarUsuario } from "../Api/ApiUsers"

function Recovery() {
    const [rutFirst8, setRutFirst8] = useState("");
    const [digitosRut, setdigitosRut] = useState("");
    const [foundUser, setFoundUser] = useState(null);
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

        let usuarioEncontrado;
        try {
            usuarioEncontrado = await getUserByCorreo(inputUser);
        } catch (err) {
            console.error(err);
            setCodeError('Error al obtener usuario. Intente más tarde.');
            return;
        }

        if (!usuarioEncontrado) {
            setCodeError('Usuario no encontrado');
            return;
        }

        const rawRut = String(usuarioEncontrado.rut || usuarioEncontrado.RUT || usuarioEncontrado.rut_usuario || '');
        const digits = rawRut.replace(/\D/g, '');
        const first8 = digits.slice(0, 8);
        setRutFirst8(first8);
        setdigitosRut(digits);
            setFoundUser(usuarioEncontrado);

        setCode("");
        setCodeError("");
        setBotonPopup(true);
    }

    const handleCodeContinue = () => {
        if (code.length !== 6) {
            setCodeError('El código debe tener 6 dígitos numéricos');
            return;
        }
        setBotonPopup2(true);
    }

    const handleConfirmNewPassword = async () => {
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

        if (!rutFirst8) {
            setPassError('No se encontró el RUT del usuario para actualizar la contraseña');
            return;
        }

        
        const buildPayload = (userObj, { useFullRut = false } = {}) => {
            const u = userObj || {};
            const rutVal = String(u.rut || u.RUT || u.rut_usuario || rutFirst8 || '');
            const dv = String(u.dv_rut || u.dv || u.DV || u.dvRut || '');
            const pnombre = u.pnombre || u.primer_nombre || u.nombre || '';
            const snombre = u.snombre || u.segundo_nombre || '';
            const apaterno = u.apaterno || u.apellido_paterno || '';
            const amaterno = u.amaterno || u.apellido_materno || '';
            const correo = u.correo || u.email || u.email_usuario || '';

            let ciudadObj = null;
            if (u.ciudad && typeof u.ciudad === 'object') {
                ciudadObj = { id_ciudad: u.ciudad.id_ciudad || u.ciudad.id || u.ciudad };
            } else if (u.id_ciudad || u.ciudad_id || u.ciudad) {
                ciudadObj = { id_ciudad: Number(u.id_ciudad || u.ciudad_id || u.ciudad) };
            }

            const rutToSend = useFullRut ? rutVal : rutVal.slice(0, 8);

            const result = {
                rut: rutToSend,
                dv_rut: dv,
                pnombre,
                snombre,
                apaterno,
                amaterno,
                correo,
                clave: newPass,
            };

            const ciudadId = ciudadObj && Number(ciudadObj.id_ciudad) ? Number(ciudadObj.id_ciudad) : 0;
            result.ciudad = { id_ciudad: ciudadId };

            return result;
        };

        try {

            const payload = buildPayload(foundUser, { useFullRut: false });
            console.info('Sending actualizarUsuario payload (ruta param:', rutFirst8, '):', payload);
            await actualizarUsuario(rutFirst8, payload);
            setPassError("");
            alert('Contraseña actualizada con éxito');
            setBotonPopup2(false);
            setBotonPopup(false);
            setNewPass("");
            setRepeatPass("");
            setUser("");
            return;
        } catch (err) {
            
            const attemptedPayload = typeof buildPayload === 'function' ? buildPayload(foundUser, { useFullRut: false }) : null;
            console.error('Error al actualizar con rutFirst8:', err?.response ?? err, '\npayload:', attemptedPayload);

            const serverStatus = err?.response?.status;
            const serverData = err?.response?.data;

                if (digitosRut && digitosRut !== rutFirst8) {
                try {
                    console.warn(`Primer intento con ${rutFirst8} falló (status=${serverStatus}). Reintentando con rut completo ${digitosRut}...`);
                    const retryPayload = buildPayload(foundUser, { useFullRut: true });
                    console.info('Retrying actualizarUsuario payload (ruta param:', digitosRut, '):', retryPayload);
                    await actualizarUsuario(digitosRut, retryPayload);
                    setPassError("");
                    alert('Contraseña actualizada con éxito (usando RUT completo)');
                    setBotonPopup2(false);
                    setBotonPopup(false);
                    setNewPass("");
                    setRepeatPass("");
                    setUser("");
                    return;
                } catch (retryErr) {
                    const status = retryErr?.response?.status;
                    const data = retryErr?.response?.data;
                    setPassError(`Error al actualizar la contraseña (reintento). servidor: ${status || ''} ${data ? JSON.stringify(data) : ''} \npayload: ${JSON.stringify(retryPayload)}`);
                    return;
                }
            }

            if (serverStatus || serverData) {
                setPassError(`Error al actualizar la contraseña. servidor: ${serverStatus || ''} ${serverData ? JSON.stringify(serverData) : ''} \npayload: ${JSON.stringify(attemptedPayload)}`);
                return;
            }

            setPassError('Error al actualizar la contraseña. Intente más tarde.');
        }
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