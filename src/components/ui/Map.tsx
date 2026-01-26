"use client";

import { useEffect, useState } from "react";
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapComponent() {
    const [plane, setPlane] = useState<{ longitude: number; latitude: number; rotation: number } | null>(null);

    useEffect(() => {
        let animationFrameId: number;
        let timeoutId: NodeJS.Timeout;

        const animatePlane = () => {
            // Kolkata center: 88.3639, 22.5726
            const centerLng = 88.3639;
            const centerLat = 22.5726;

            // Randomize start (Bottom-Right / SE)
            // Lng > center, Lat < center
            const startLng = centerLng + (0.05 + Math.random() * 0.1);
            const startLat = centerLat - (0.05 + Math.random() * 0.1);

            // Randomize end (Top-Left / NW)
            // Lng < center, Lat > center
            const endLng = centerLng - (0.05 + Math.random() * 0.1);
            const endLat = centerLat + (0.05 + Math.random() * 0.1);

            // Calculate rotation (bearing)
            const y = Math.sin(endLng - startLng) * Math.cos(endLat);
            const x = Math.cos(startLat) * Math.sin(endLat) -
                Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
            const rotation = (Math.atan2(y, x) * 180 / Math.PI);

            const duration = 15000 + Math.random() * 10000;
            const startTime = performance.now();

            const frame = (now: number) => {
                const elapsed = now - startTime;
                if (elapsed > duration) {
                    setPlane(null);
                    scheduleNextFlight();
                    return;
                }

                const progress = elapsed / duration;
                const currentLng = startLng + (endLng - startLng) * progress;
                const currentLat = startLat + (endLat - startLat) * progress;

                setPlane({
                    longitude: currentLng,
                    latitude: currentLat,
                    rotation: rotation
                });

                animationFrameId = requestAnimationFrame(frame);
            };

            animationFrameId = requestAnimationFrame(frame);
        };

        const scheduleNextFlight = () => {
            const delay = 3000 + Math.random() * 5000; // More frequent: 3-8s
            timeoutId = setTimeout(animatePlane, delay);
        };

        scheduleNextFlight();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="w-full h-full">
            <Map
                initialViewState={{
                    longitude: 88.3639,
                    latitude: 22.5726,
                    zoom: 11
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="https://api.maptiler.com/maps/basic-v2-dark/style.json?key=w66xaM0hp1KMOXBriVJp"
                attributionControl={false}
            >
                <Marker longitude={88.3639} latitude={22.5726} anchor="bottom" >
                    <div className="relative flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full z-10" />
                        <div className="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-ping" />
                    </div>
                </Marker>

                {plane && (
                    <Marker longitude={plane.longitude} latitude={plane.latitude} anchor="center">
                        <div
                            style={{ transform: `rotate(${plane.rotation - 45}deg)` }}
                            className="relative flex items-center justify-center transition-transform duration-75"
                        >
                            <div className="relative">
                                {/* Shadow - Offset slightly */}
                                <img
                                    src="/plane-shadow.png"
                                    alt="shadow"
                                    className="absolute top-4 left-4 w-14 h-14 object-contain opacity-50 z-0 pointer-events-none"
                                />

                                {/* Main Plane - Increased size, No manual contrails */}
                                <img
                                    src="/plane.png"
                                    alt="plane"
                                    className="w-14 h-14 object-contain drop-shadow-2xl relative z-10"
                                />
                            </div>
                        </div>
                    </Marker>
                )}
            </Map>
        </div >
    );
}
