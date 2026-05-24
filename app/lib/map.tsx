'use client';

import { RefObject, useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { getPoints } from "@/app/lib/actions";
import { WasteType } from '../../shared/types/place';

export default function Map({ selectedFilters }: WasteType, search : string) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map>(null);
    const markers = [];
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
            const filter = selectedFilters;
            const valid_points = [];
            for (let i = 0; i < points.length; i++) {
                if (points[i]["type"].search(filter) != -1) {
                    valid_points.push(points[i]);
                }
            }
            //points = points.filter((point) => point["name"].toLowerCase().includes(search) || point["adress"].toLowerCase().includes(search),)
            if (filter == "all" && search==null) {
                for (let i = 0; i < points.length; i++) {
                    valid_points.push(points[i]);
                }
            }

            for (let i = 0; i < valid_points.length; i++) {
                markers[i] = new maplibregl.Marker().setLngLat([valid_points[i]["x"], valid_points[i]["y"]]).addTo(map.current);
            }
        };

        initMap();

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [selectedFilters]);

    return (<div ref={mapContainer} style={{ height: '100%', width: '100%' }} />);
}