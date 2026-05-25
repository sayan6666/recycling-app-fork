'use client';

import { RefObject, useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { getPoints } from "@/app/lib/actions";
import { WasteType } from '../../shared/types/place';

interface props {
    selectedFilters: WasteType | "all";
    search: string;
}

export default function Map({ selectedFilters, search }: props) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map>(null);
    const markers = [];
    const popups = [];
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        const initMap = async () => {
            const maplibregl = await import('maplibre-gl');

            map.current = new maplibregl.default.Map({
                container: mapContainer.current!,
                style: 'https://api.maptiler.com/maps/base-v4/style.json?key=Dpdm3D9OQnFUwiBXnU5A',
                center: [0, 0],
                zoom: 1,
                maplibreLogo: true
            });

            let points = await getPoints();
            let valid_points = points.filter(point => selectedFilters == "all" || point.type == selectedFilters);
            valid_points = valid_points.filter(point => point["name"].toLowerCase().includes(search.toLowerCase()) || point["adress"].toLowerCase().includes(search.toLowerCase()))
            for (let i = 0; i < points.length; i++) {
                if (points[i]["type"].search(selectedFilters) != -1) {
                    valid_points.push(points[i]);
                }
            }
            for (let i = 0; i < valid_points.length; i++) {
                popups[i] = new maplibregl.Popup({ offset: 25 })
                    .setHTML(`
                    <article
            key=${valid_points[i]["id"]}
            style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}
            >
            <h3>${valid_points[i]["name"]}</h3>
            <p>${valid_points[i]["adress"]}</p>
            <p>Types: ${valid_points[i]["type"]}</p>
            <a href=/place/${(valid_points[i]["id"]).toString()}>Open point card</a>
            </article>`);
            }

            for (let i = 0; i < valid_points.length; i++) {
                markers[i] = new maplibregl.Marker().setLngLat([valid_points[i]["y"], valid_points[i]["x"]]).setPopup(popups[i]).addTo(map.current);
            }
        };

        initMap();

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [selectedFilters, search]);

    return (<div ref={mapContainer} style={{ height: '100%', width: '100%' }} />);
}