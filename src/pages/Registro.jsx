import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { obtainUsers } from "../Api/ApiUsers"
import { useForm } from "react-hook-form"

function Registro() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const watchedPassword = watch('contrasenna');

    const onSubmit = async (data) => {
        setError("");

        // validaciones adicionales
        if (data.usuario.length < 5) {
            setError("El nombre de usuario debe tener al menos 5 caracteres");
            return;
        }

        if (data.contrasenna !== data.contra2) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (data.ciudad === '0') {
            setError("Debe seleccionar una ciudad");
            return;
        }

        if (!data.acceptTerms) {
            setError("Debe aceptar los términos y condiciones");
            return;
        }

        // verificar existencia de usuario
        let usuarios;
        try {
            usuarios = await obtainUsers();
        } catch (err) {
            console.error(err);
            setError('No se pudo verificar usuarios. Intente más tarde.');
            return;
        }

        const usuarioExistente = usuarios.usuarios.find(u => u.nombre === data.usuario || u.correo === data.email);
        if (usuarioExistente) {
            setError('El usuario ya existe');
            return;
        }

        // guardar en localStorage y navegar
        localStorage.setItem('username', JSON.stringify(data.usuario));
        localStorage.setItem('pass', JSON.stringify(data.contra2));

        alert('Usuario creado con exito');
        navigate('/');
    }

    return (
        <>
            <NavBar />
            <div className="container py-4" style={{ maxWidth: 600 }}>
                <h1 className="mb-3">Registro</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="userId" className="form-label"><strong>Nombre de usuario</strong></label>
                        <input type="text" id="userId" className="form-control" placeholder="Ingrese su nombre de usuario" {...register('usuario', { required: true })} />
                        {errors.usuario && <small className="text-danger">El nombre es obligatorio</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label"><strong>Email</strong></label>
                        <input type="email" id="correo" className="form-control" placeholder="Ingrese su email" {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
                        {errors.email && <small className="text-danger">Email inválido</small>}
                        <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password1" className="form-label"><strong>Contraseña</strong></label>
                        <input type="password" id="password1" className="form-control" placeholder="Ingrese su contraseña" {...register('contrasenna', { required: true, minLength: 4 })} />
                        {errors.contrasenna && <small className="text-danger">La contraseña debe tener al menos 4 caracteres</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label"><strong>Repetir contraseña</strong></label>
                        <input type="password" id="password2" className="form-control" placeholder="Confirme su contraseña" {...register('contra2', { required: true, validate: (val) => val === watchedPassword })} />
                        {errors.contra2 && <small className="text-danger">Las contraseñas no coinciden</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ciudad" className="form-label"><strong>Ciudad</strong></label>
                        <select id="ciudad" className="form-select" {...register('ciudad', { required: true })}>
                            <option value="0">Seleccione una ciudad</option>
                            <option value="1">Viña del mar</option>
                            <option value="2">Valparaiso</option>
                            <option value="3">Chillan</option>
                        </select>
                        {errors.ciudad && <small className="text-danger">Debe seleccionar una ciudad</small>}
                    </div>

                    <div id="selec_ciudad" className="mb-3 form-check">
                        <input type="checkbox" id="exampleCheck1" className="form-check-input" {...register('acceptTerms')} />
                        <label className="form-check-label" htmlFor="exampleCheck1"><strong>Acepto los <a href="#">términos y condiciones</a></strong></label>
                        {errors.acceptTerms && <div><small className="text-danger">Debe aceptar los términos y condiciones</small></div>}
                    </div>

                    <button type="submit" className="btn btn-success">Enviar</button>
                </form>

                {error && <div className="mt-3 text-danger">{error}</div>}
            </div>

            <Footer />
        </>
    )
}

export default Registro