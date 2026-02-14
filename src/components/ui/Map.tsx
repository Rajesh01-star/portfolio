"use client";

import { useEffect, useState, useRef } from "react";
import Map, { Marker, Source, Layer } from 'react-map-gl/maplibre';
import { useTheme } from "next-themes";
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapComponent() {
    const { theme } = useTheme();
    const mapRef = useRef<any>(null);
    const requestRef = useRef<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Fixed aesthetic route: South-West to North-East
    const START_POS = { lng: 88.20, lat: 22.40 };
    const END_POS = { lng: 88.55, lat: 22.75 };

    const initialFeature = {
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: [START_POS.lng, START_POS.lat] },
        properties: { rotation: 45 }
    };

    const loadImages = (map: any) => {
        if (!map) return;

        const addImage = (name: string, url: string) => {
            if (map.hasImage(name)) {
                return;
            }

            const img = new Image();
            img.src = url;
            img.onload = () => {
                if (!map.hasImage(name)) {
                    map.addImage(name, img);
                    setImagesLoaded(true);
                }
            };
            img.onerror = (e) => {
                console.error(`Error loading ${name}:`, e);
            };
        };

        addImage('plane', '/plane.png');
        addImage('plane-shadow', '/plane-shadow.png');
    };

    const onMapLoad = (event: any) => {
        const map = event.target;

        // Initial load
        loadImages(map);
        startAnimation(map);

        // Re-load images whenever style changes
        map.on('styledata', () => {
            loadImages(map);
        });
    };

    // Reload images when theme changes
    useEffect(() => {
        const map = mapRef.current?.getMap();
        if (map && map.isStyleLoaded()) {
            loadImages(map);
        }
    }, [theme]);


    const startAnimation = (map: any) => {
        let startTime = performance.now();
        const duration = 45000; // 45s flight
        const pause = 10000; // 10s pause

        const animate = (time: number) => {
            const timestamp = time - startTime;
            const totalCycle = duration + pause;
            const progress = (timestamp % totalCycle) / duration;

            if (progress <= 1) {
                // Interpolate Position
                const currentLng = START_POS.lng + (END_POS.lng - START_POS.lng) * progress;
                const currentLat = START_POS.lat + (END_POS.lat - START_POS.lat) * progress;

                // Calculate Bearing
                const y = Math.sin(END_POS.lng - START_POS.lng) * Math.cos(END_POS.lat);
                const x = Math.cos(START_POS.lat) * Math.sin(END_POS.lat) -
                    Math.sin(START_POS.lat) * Math.cos(END_POS.lat) * Math.cos(END_POS.lng - START_POS.lng);
                const bearing = (Math.atan2(y, x) * 180 / Math.PI);

                // Update Data Imperatively
                const source = map.getSource('plane-source');
                if (source && source.setData) { // Check setData exists (GeoJSON source)
                    source.setData({
                        type: 'Feature',
                        geometry: { type: 'Point', coordinates: [currentLng, currentLat] },
                        properties: { rotation: bearing + 75 }
                    });
                }

                // Toggle visibility (ensure visible)
                if (map.getLayer('plane-layer')) map.setLayoutProperty('plane-layer', 'visibility', 'visible');
                if (map.getLayer('plane-shadow-layer')) map.setLayoutProperty('plane-shadow-layer', 'visibility', 'visible');

            } else {
                // Restart loop
                startTime = performance.now(); // Reset time for loop
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        cancelAnimationFrame(requestRef.current);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden">
            <Map
                ref={mapRef}
                initialViewState={{
                    longitude: 88.3639,
                    latitude: 22.5726,
                    zoom: 11
                }}
                onLoad={onMapLoad}
                style={{ width: '100%', height: '100%' }}
                mapStyle={theme === 'dark' ? "https://api.maptiler.com/maps/basic-v2-dark/style.json?key=w66xaM0hp1KMOXBriVJp" : "https://api.maptiler.com/maps/basic-v2-light/style.json?key=w66xaM0hp1KMOXBriVJp"}
                attributionControl={false}
                dragPan={false}
                scrollZoom={false}
                doubleClickZoom={false}
            >
                <Marker longitude={88.3639} latitude={22.5726} anchor="center">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                    </span>
                </Marker>

                {/* Using React-Map-GL Sources/Layers ensures they are re-added if style resets */}
                {/* We pass 'initialFeature' to data, but we will update the internal Mapbox source imperatively in animation loop. */}
                {/* IMPORTANT: If we update 'data' prop here, React will overwrite our imperative updates. So pass static initial data. */}
                {/* Only render layers if images are fully loaded to prevent errors */}
                {/* Always render Source/Layers so map.getSource finds them immediately */}
                <Source id="plane-source" type="geojson" data={initialFeature} />

                {imagesLoaded && (
                    <>
                        <Layer
                            id="plane-shadow-layer"
                            source="plane-source"
                            type="symbol"
                            layout={{
                                'icon-image': 'plane-shadow',
                                'icon-size': 0.4,
                                'icon-rotate': ['get', 'rotation'],
                                'icon-allow-overlap': true,
                                'icon-ignore-placement': true
                            }}
                            paint={{
                                'icon-opacity': 0.6,
                                'icon-translate': [15, 15]
                            }}
                        />
                        <Layer
                            id="plane-layer"
                            source="plane-source"
                            type="symbol"
                            layout={{
                                'icon-image': 'plane',
                                'icon-size': 0.4,
                                'icon-rotate': ['get', 'rotation'],
                                'icon-allow-overlap': true,
                                'icon-ignore-placement': true
                            }}
                        />
                    </>
                )}
            </Map>

            {/* Cloud Layer - Overlaying the map */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-40 mix-blend-overlay">
                {/* Moving Clouds Animation */}
                <div className="absolute top-0 left-0 w-[200%] h-full flex animate-clouds">
                    <img src="/cloud.webp" alt="clouds" className="w-1/2 h-full object-cover" />
                    <img src="/cloud.webp" alt="clouds" className="w-1/2 h-full object-cover" />
                </div>
            </div>
        </div>
    );
}
