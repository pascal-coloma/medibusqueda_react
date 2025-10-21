import { useEffect, useState } from "react"

function EditarPerfil({ initialUsername, initialCiudad, initialImage, onSave, onCancel }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(initialUsername || "")
    const [ciudad, setCiudad] = useState(initialCiudad || "")
    const [profileImage, setProfileImage] = useState(initialImage || "")
    const [error, setError] = useState("")

    useEffect(() => {
        const stored = initialUsername || localStorage.getItem('username')
        const storedCiudad = initialCiudad || localStorage.getItem('ciudad')
        const fotoPerfil = initialImage || localStorage.getItem('profileImage')

        try {
            setUsername(stored ? JSON.parse(stored) : "")
        } catch (e) {
            setUsername(stored || "")
        }

        setCiudad(storedCiudad || "")
        setProfileImage(fotoPerfil || "")
        setLoading(false)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if (!username || username.trim().length < 3) {
            setError('El nombre debe tener al menos 3 caracteres')
            return
        }

        // Guardar en localStorage
        localStorage.setItem('username', JSON.stringify(username.trim()))
        if (ciudad) localStorage.setItem('ciudad', ciudad)
        else localStorage.removeItem('ciudad')
        if (profileImage) localStorage.setItem('profileImage', profileImage)
        else localStorage.removeItem('profileImage')

        if (onSave) onSave({ username: username.trim(), ciudad, profileImage })
    }

    if (loading) return null

    return (
        <div className="container py-4" style={{ maxWidth: 800 }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre de usuario</label>
                    <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">URL de la foto de perfil (opcional)</label>
                    <input className="form-control" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder="https://..." />
                </div>

                <div className="mb-3">
                    <label className="form-label">Ciudad</label>
                    <select className="form-select" value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
                        <option value="">Seleccione una ciudad</option>
                        <option value="Viña del mar">Viña del mar</option>
                        <option value="Valparaiso">Valparaiso</option>
                        <option value="Chillan">Chillan</option>
                    </select>
                </div>

                {error && <div className="text-danger mb-3">{error}</div>}

                <div className="d-flex gap-2">
                    <button className="btn btn-primary" type="submit">Guardar</button>
                    <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default EditarPerfil