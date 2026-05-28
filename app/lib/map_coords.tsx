'use client';

import { RefObject, useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map>(null);
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        const initMap = async () => {
            const maplibregl = await import('maplibre-gl');

            map.current = new maplibregl.Map({
                container: mapContainer.current!,
                style: 'https://api.maptiler.com/maps/base-v4/style.json?key=Dpdm3D9OQnFUwiBXnU5A',
                center: [0, 0],
                zoom: 1,
                maplibreLogo: true
            });
                map.current.on('click', (e) => {
                    const { lng, lat } = e.lngLat;

                    const formattedLng = lng.toFixed(6);
                    const formattedLat = lat.toFixed(6);

                    const popup = new maplibregl.Popup({ closeOnClick: true, offset: 25 })
                        .setHTML(`<div><p>Longtitude: ${formattedLng}</p></div>
                    <div><p>Latitude: ${formattedLat}</p></div>
                    `).setLngLat([lng, lat]).addTo(map.current);
                    console.log(formattedLat);
                    console.log(formattedLng);
                })
        };

        initMap();

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    },[]);

    return (<div ref={mapContainer} style={{ height: '400px', width: '570px' }} />);
}