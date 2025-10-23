
import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function Mapa({ initialCiudad } = {}) {
    const containerRef = useRef(null)
    const mapRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return
            const ciudad = (typeof initialCiudad !== 'undefined') ? String(initialCiudad) : (localStorage.getItem('ciudad') || '0')
        let ubicacion = { lat: -33.033604, lng: -71.532814} // valor por defecto
        let nombreCiudad = 'MediBusqueda'

        switch (ciudad) {
            case '1':
                ubicacion = { lat: -33.0513034, lng: -71.6233221 }
                nombreCiudad= 'Viña del Mar'
                break
            case '2': 
                ubicacion = { lat: -33.0473128, lng: -71.6127458 }
                nombreCiudad= 'Valparaiso'
                break
            case '3':
                ubicacion = { lat: -36.6062508, lng: -72.1023137 }
                nombreCiudad= 'Chillan'
                break
            default:
                break
        }

        if (!mapRef.current) {
            const map = L.map(containerRef.current).setView([ubicacion.lat, ubicacion.lng], 15)

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map)

            const marker = L.marker([ubicacion.lat, ubicacion.lng]).addTo(map)
            marker.bindPopup(nombreCiudad).openPopup()

            mapRef.current = map
        } else {
            mapRef.current.setView([ubicacion.lat, ubicacion.lng], 13)
        }

        
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [])

    return (
        <div style={{ height: 400 }} ref={containerRef} id="map-container"></div>
    )
}

export default Mapa