import { ciudadId } from "./ApiCiudad";


// Setear medicamentos recibidos desde inicio para renderizarlos en el DOM
export async function consultarApi(id, medicamento, setMedicamentos) {

    const ultimas = JSON.parse(localStorage.getItem("busquedasRecientes")) || []
    const url = "http://54.161.22.247:3000/api/medicamento"
    const ciudad = await ciudadId(id)
    
    const payload = {
        latitud: ciudad.latitud,
        longitud: ciudad.longitud,
        nombreMedicamento: medicamento.toUpperCase(),
    }

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((json) => {

            const listado = json["listado"] || []
            const nuevosMedicamentos = []

            for (let i = 0; i < listado.length; i++) {
                const med = listado[i]
                const presentaciones = med["presentacionesExistentes"] || []

                if (presentaciones.length > 0 && presentaciones[0]["productos"]) {
                    const productos = presentaciones[0]["productos"]
                    for (let j = 0; j < productos.length; j++) {
                        nuevosMedicamentos.push(productos[j])
                    }
                }
            }

            setMedicamentos(nuevosMedicamentos)
            localStorage.setItem("medicamentos", JSON.stringify(nuevosMedicamentos))
        })
        .catch((error) => console.log(error.message))
}