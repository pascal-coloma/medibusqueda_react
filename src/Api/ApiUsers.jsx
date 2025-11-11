export const obtainUsers = async () => {
    try {
        const ifoAPI = await fetch("http://localhost:8080/medbusq/v1/usuario")

        if (!ifoAPI.ok) throw Error("No se encontraron usuarios")

        const usuarios = await ifoAPI.json()
        return usuarios
    } catch (error) {
        console.log(error)
        return {
            total_users: 0,
            users: []
        }
    }
}

export async function registrarUsuario(userData) {
    const response = await fetch("http://localhost:8080/medbusq/v1/usuario/guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Error al registrar usuario");
    }

    return await response.json();
}
