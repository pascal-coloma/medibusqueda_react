import { useEffect, useState } from "react";
import { traerCiudades } from "../Api/ApiUsers";

export default function CiudadSelect({ value, onChange }) {
    const [ciudades, setCiudades] = useState([]);

    useEffect(() => {
        const fetchCiudades = async () => {
            try {
                const data = await traerCiudades();
                setCiudades(data);
            } catch (err) {
                console.error("Error al consultar ciudades", err);
            }
        }
        fetchCiudades();
    }, []);
    return (
        <div className="mb-3">
            <label htmlFor="ciudad" className="form-label fw-semibold text-secondary">
                Seleccione ciudad
            </label>
            <select
                id="ciudad"
                name="ciudad"
                className="form-select form-select-lg shadow-sm border-0 rounded-3"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Seleccione una ciudad</option>
                {ciudades.map((c) => (
                    <option key={c.id_ciudad} value={c.id_ciudad}>
                        {c.nombre}
                    </option>
                ))}
            </select>
        </div>
    );

}