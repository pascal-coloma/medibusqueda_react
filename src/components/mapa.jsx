
import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ciudadId } from '../Api/ApiCiudad'

function Mapa({ initialCiudad } = {}) {
    const containerRef = useRef(null)
    const mapRef = useRef(null)

    useEffect(() => {
        console.info('[Mapa] inicializando, initialCiudad =', initialCiudad)

        const initializeMap = (ubicacion, nombreCiudad) => {
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
        }

        const ciudad = (typeof initialCiudad !== 'undefined' && initialCiudad !== '0') ? String(initialCiudad) : null;

        if (ciudad) {
            ciudadId(ciudad).then(data => {
                console.info('[Mapa] respuesta /ciudad/', ciudad, data)
                if (!data) {
                    console.warn('[Mapa] no data for city id', ciudad)
                    const ubicacion = { lat: -33.033604, lng: -71.532814 };
                    initializeMap(ubicacion, 'MediBusqueda')
                    return
                }

                const rawLat = data.latitud ?? data.lat ?? data.latitude
                const rawLng = data.longitud ?? data.long ?? data.longitude ?? data.lng

                if (rawLat == null || rawLng == null) {
                    console.warn('[Mapa] city response missing coordinates for id', ciudad)
                    const ubicacion = { lat: -33.033604, lng: -71.532814 };
                    initializeMap(ubicacion, data.nombre || 'MediBusqueda')
                    return
                }

                const ubicacion = { lat: parseFloat(rawLat), lng: parseFloat(rawLng) };
                initializeMap(ubicacion, data.nombre || 'MediBusqueda');
            }).catch(err => {
                console.error('[Mapa] error fetching ciudad:', err)
                const ubicacion = { lat: -33.033604, lng: -71.532814 };
                initializeMap(ubicacion, 'MediBusqueda')
            });
        } else {
            const ubicacion = { lat: -33.033604, lng: -71.532814 }; // valor por defecto
            const nombreCiudad = 'MediBusqueda';
            initializeMap(ubicacion, nombreCiudad);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [initialCiudad])

    return (
        <div style={{ height: 400 }} ref={containerRef} id="map-container"></div>
    )
}

export default Mapa