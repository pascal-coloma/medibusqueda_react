import axios from "axios"
import { useEffect, useState } from "react"

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

export async function traerCiudades() {
    try {
        const { data } = await api.get("/ciudad");
        
        return data;
    } catch (error) {
        handleError(error);
        return [];
    }
}

export function ciudadId(id){
    return fetch(`${API_URL}/ciudad/${id}`)
    .then(response => response.json())
    .then(json => {
        return json
    })
    .catch(error => {
        console.error(error)
    })
}