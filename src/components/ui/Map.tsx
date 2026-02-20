"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Map, { Marker, Source, Layer } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { useTheme } from "next-themes";
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapComponent() {
    const { theme } = useTheme();
    const requestRef = useRef<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const isAnimatingRef = useRef(false);
    const isMountedRef = useRef(true);

    const mapInstanceRef = useRef<maplibregl.Map | null>(null);

    // Fixed aesthetic route: South-West to North-East
    const START_POS = { lng: 88.20, lat: 22.40 };
    const END_POS = { lng: 88.55, lat: 22.75 };

    const initialFeature = {
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: [START_POS.lng, START_POS.lat] },
        properties: { rotation: 45 }
    };

    const loadImages = useCallback((map: maplibregl.Map) => {
        if (!map || !map.getStyle()) return;

        const addImage = (name: string, url: string) => {
            if (map.hasImage(name)) return;

            map.loadImage(url).then((image: any) => {
                if (!map.hasImage(name)) {
                    // Check if map/style is still valid before adding
                    if (map.getStyle()) {
                        // MapLibre loadImage returns objects with { data: ... }
                        map.addImage(name, image.data);
                        // Only set state if mounted to avoid leaks
                        if (isMountedRef.current) {
                            setImagesLoaded(true);
                        }
                    }
                }
            }).catch((error: any) => {
                console.error(`Error loading ${name}:`, error);
            });
        };

        addImage('plane', '/plane.png');
        addImage('plane-shadow', '/plane-shadow.png');
    }, []);

    const animate = useCallback((time: number) => {
        // Use internal ref instead of MapRef to avoid type/runtime mismatches
        const map = mapInstanceRef.current;

        // Safety guards
        if (!map || !map.getStyle() || !map.getSource('plane-source')) {
            // Check again next frame, or stop if we should custom handle this.
            // If checking fails, likely style is reloading or map unmounted.
            // We just loop until it's ready again or cancelled.
            if (isAnimatingRef.current) {
                requestRef.current = requestAnimationFrame(animate);
            }
            return;
        }

        // Calculate progress
        const duration = 70000; // 30s flight (slower, more graceful movement)
        const pause = 500; // 0.5s pause (frequent appearances)
        const totalCycle = duration
        const progress = (time % totalCycle) / duration;

        if (progress <= 1) {
            // Interpolate
            const currentLng = START_POS.lng + (END_POS.lng - START_POS.lng) * progress;
            const currentLat = START_POS.lat + (END_POS.lat - START_POS.lat) * progress;

            // Bearing
            const y = Math.sin(END_POS.lng - START_POS.lng) * Math.cos(END_POS.lat);
            const x = Math.cos(START_POS.lat) * Math.sin(END_POS.lat) -
                Math.sin(START_POS.lat) * Math.cos(END_POS.lat) * Math.cos(END_POS.lng - START_POS.lng);
            const bearing = (Math.atan2(y, x) * 180 / Math.PI);

            // Imperative Update
            // We already checked map.getSource('plane-source') above
            const source = map.getSource('plane-source') as maplibregl.GeoJSONSource;
            if (source && source.setData) {
                source.setData({
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [currentLng, currentLat] },
                    properties: { rotation: bearing + 75 }
                });
            }

            // Toggle visibility safely
            if (map.getLayer('plane-layer') && map.getLayoutProperty('plane-layer', 'visibility') !== 'visible') {
                map.setLayoutProperty('plane-layer', 'visibility', 'visible');
            }
            if (map.getLayer('plane-shadow-layer') && map.getLayoutProperty('plane-shadow-layer', 'visibility') !== 'visible') {
                map.setLayoutProperty('plane-shadow-layer', 'visibility', 'visible');
            }
        } else {
            // Hide when waiting
            if (map.getLayer('plane-layer') && map.getLayoutProperty('plane-layer', 'visibility') !== 'none') {
                map.setLayoutProperty('plane-layer', 'visibility', 'none');
            }
            if (map.getLayer('plane-shadow-layer') && map.getLayoutProperty('plane-shadow-layer', 'visibility') !== 'none') {
                map.setLayoutProperty('plane-shadow-layer', 'visibility', 'none');
            }
        }

        if (isAnimatingRef.current) {
            requestRef.current = requestAnimationFrame(animate);
        }
    }, [START_POS.lng, START_POS.lat, END_POS.lng, END_POS.lat]);


    const startAnimation = useCallback(() => {
        if (isAnimatingRef.current) return; // Prevent double trigger
        isAnimatingRef.current = true;
        requestRef.current = requestAnimationFrame(animate);
    }, [animate]);

    const stopAnimation = useCallback(() => {
        isAnimatingRef.current = false;
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = 0;
        }
    }, []);

    // Separate handler for style data to be stable
    const handleStyleData = useCallback(() => {
        const map = mapInstanceRef.current;
        if (map) {
            loadImages(map);
            // Source might be re-added by React-Map-GL automatically, 
            // but we need to ensure animation loop picks it up.
            // The animation loop checks for getSource presence, so it should auto-recover.
        }
    }, [loadImages]);

    // Handle Map Load
    const onMapLoad = useCallback((event: any) => {
        const map = event.target;
        mapInstanceRef.current = map; // Store instance safely
        loadImages(map);
        startAnimation();

        // Handle style data changes (e.g. theme switch causes style reload)
        // Ensure we don't attach duplicate listeners
        map.off('styledata', handleStyleData);
        map.on('styledata', handleStyleData);
    }, [loadImages, startAnimation, handleStyleData]); // Dependencies stable

    // Lifecycle Cleanup
    useEffect(() => {
        isMountedRef.current = true;
        // Start animation if map is already loaded (re-mount scenario?)
        // Actually, onLoad handles the start.

        return () => {
            isMountedRef.current = false;
            stopAnimation();
            const map = mapInstanceRef.current;
            if (map) {
                map.off('styledata', handleStyleData);
                // Map removal is handled by react-map-gl component unmount
            }
        };
    }, [stopAnimation, handleStyleData]);

    return (
        <div className="w-full h-full relative overflow-hidden">
            <Map
                mapLib={maplibregl}
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
                reuseMaps={true} // Helps with Strict Mode double-invoke and context loss
            >
                <Marker longitude={88.3639} latitude={22.5726} anchor="center">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                    </span>
                </Marker>

                <Source id="plane-source" type="geojson" data={initialFeature} />

                {imagesLoaded && (
                    <>
                        <Layer
                            id="plane-shadow-layer"
                            source="plane-source"
                            type="symbol"
                            layout={{
                                'icon-image': 'plane-shadow',
                                'icon-size': 0.35,
                                'icon-rotate': ['get', 'rotation'],
                                'icon-allow-overlap': true,
                                'icon-ignore-placement': true,
                                'visibility': 'visible'
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
                                'icon-size': 0.35,
                                'icon-rotate': ['get', 'rotation'],
                                'icon-allow-overlap': true,
                                'icon-ignore-placement': true,
                                'visibility': 'visible'
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
