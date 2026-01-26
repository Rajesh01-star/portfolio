"use client";

import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapComponent() {
    return (
        <div className="w-full h-full">
            <Map
                initialViewState={{
                    longitude: -87.6298, // Chicago
                    latitude: 41.8781,
                    zoom: 13
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="https://api.maptiler.com/maps/basic-v2-dark/style.json?key=w66xaM0hp1KMOXBriVJp"
                attributionControl={false}
            >
                <Marker longitude={-87.6298} latitude={41.8781} anchor="bottom" >
                    <div className="relative flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.6)] z-10" />
                        <div className="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-ping" />
                    </div>
                </Marker>
            </Map>
        </div>
    );
}
