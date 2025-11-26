import axios from "axios"

const API_URL = "http://54.161.22.247:8080/medbusq/v1"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const handleError = (error) => {
    console.error("Error en la API:", error);
};


export async function obtainUsers() {
    try {
        const { data } = await api.get("/usuario");
        return data;
    } catch (error) {
        handleError(error);
        return { total_users: 0, users: [] };
    }
}

export async function registrarUsuario(userData) {
    try {
        const { data } = await api.post("/usuario/guardar", userData);
        return data;
    } catch (error) {
        handleError(error);
    }
}

