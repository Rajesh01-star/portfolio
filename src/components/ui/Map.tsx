"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Map, { Marker, Source, Layer } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { useTheme } from "next-themes";
import 'maplibre-gl/dist/maplibre-gl.css';

const getRandomPos = () => ({
    lng: 88.3639 + (Math.random() - 0.5) * 0.15,
    lat: 22.5726 + (Math.random() - 0.5) * 0.15
});

const BalloonMarker = ({ isReady }: { isReady: boolean }) => {
    const startRef = useRef(getRandomPos());
    const endRef = useRef(getRandomPos());
    const startTimeRef = useRef<number | null>(null);
    const [pos, setPos] = useState(startRef.current);

    useEffect(() => {
        if (!isReady) return;
        let frame: number;
        const animate = (time: number) => {
            if (!startTimeRef.current) startTimeRef.current = time;
            const elapsed = time - startTimeRef.current;
            const duration = 20000;
            const progress = elapsed / duration;
            if (progress >= 1) {
                startRef.current = endRef.current;
                endRef.current = getRandomPos();
                startTimeRef.current += duration;
            }
            const p = Math.min(progress, 1);
            const lng = startRef.current.lng + (endRef.current.lng - startRef.current.lng) * p;
            const lat = startRef.current.lat + (endRef.current.lat - startRef.current.lat) * p;
            setPos({ lng, lat });
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [isReady]);

    return (
        <Marker longitude={pos.lng} latitude={pos.lat} anchor="bottom" style={{ mixBlendMode: 'screen' }}>
            <img
                src="/hot-air-balloon.gif"
                alt="Hot Air Balloon"
                className="w-16 h-16 object-contain pointer-events-none drop-shadow-2xl opacity-90 invert hue-rotate-180 brightness-110"
            />
        </Marker>
    );
};

export default function MapComponent() {
    const { theme } = useTheme();
    const requestRef = useRef<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isZoomFinished, setIsZoomFinished] = useState(false);

    const imagesLoadedRef = useRef(false);
    const isZoomFinishedRef = useRef(false);
    const isAnimatingRef = useRef(false);
    const isMountedRef = useRef(true);
    const mapInstanceRef = useRef<maplibregl.Map | null>(null);

    // Track frame count to throttle logs
    const frameCountRef = useRef(0);

    const START_POS = { lng: 88.20, lat: 22.40 };
    const END_POS = { lng: 88.55, lat: 22.75 };

    const initialFeature = {
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: [START_POS.lng, START_POS.lat] },
        properties: { rotation: 45 }
    };

    const handleSetImagesLoaded = (val: boolean) => {
        imagesLoadedRef.current = val;
        setImagesLoaded(val);
    };

    const handleSetZoomFinished = (val: boolean) => {
        isZoomFinishedRef.current = val;
        setIsZoomFinished(val);
    };

    const loadImages = useCallback((map: maplibregl.Map) => {
        if (!map || !map.getStyle()) {
            console.warn('[loadImages] Map or style not ready, skipping.');
            return;
        }

        const addImage = (name: string, url: string) => {
            if (map.hasImage(name)) {
                // Still mark as loaded in case state wasn't set
                if (isMountedRef.current) handleSetImagesLoaded(true);
                return;
            }
            map.loadImage(url).then((image: any) => {
                if (!map.hasImage(name) && map.getStyle()) {
                    map.addImage(name, image.data);
                    if (isMountedRef.current) handleSetImagesLoaded(true);
                }
            }).catch((error: any) => {
                console.error(`[loadImages] ❌ Error loading "${name}":`, error);
            });
        };

        addImage('plane', '/plane.png');
        addImage('plane-shadow', '/plane-shadow.png');
    }, []);

    const animate = useCallback((time: number) => {
        frameCountRef.current += 1;
        const shouldLog = frameCountRef.current % 120 === 0; // Log every ~2 seconds

        const map = mapInstanceRef.current;

        if (!map) {
            if (shouldLog) console.warn('[animate] ❌ No map instance.');
            if (isAnimatingRef.current) requestRef.current = requestAnimationFrame(animate);
            return;
        }

        if (!map.getStyle()) {
            if (shouldLog) console.warn('[animate] ❌ Map style not ready.');
            if (isAnimatingRef.current) requestRef.current = requestAnimationFrame(animate);
            return;
        }

        if (!map.getSource('plane-source')) {
            if (shouldLog) console.warn('[animate] ❌ plane-source not found on map yet.');
            if (isAnimatingRef.current) requestRef.current = requestAnimationFrame(animate);
            return;
        }

        if (!imagesLoadedRef.current) {
            if (shouldLog) console.warn('[animate] ⏳ Images not loaded yet.');
            if (isAnimatingRef.current) requestRef.current = requestAnimationFrame(animate);
            return;
        }

        if (!isZoomFinishedRef.current) {
            ['plane-layer', 'plane-shadow-layer'].forEach(id => {
                if (map.getLayer(id) && map.getLayoutProperty(id, 'visibility') !== 'none') {
                    map.setLayoutProperty(id, 'visibility', 'none');
                }
            });
            if (isAnimatingRef.current) requestRef.current = requestAnimationFrame(animate);
            return;
        }

        const duration = 40000;
        const pause = 2000;
        const totalCycle = duration + pause;
        const progress = (time % totalCycle) / duration;

        if (shouldLog) {
        }

        if (progress <= 1) {
            const currentLng = START_POS.lng + (END_POS.lng - START_POS.lng) * progress;
            const currentLat = START_POS.lat + (END_POS.lat - START_POS.lat) * progress;

            if (shouldLog) {
                // Check if within map viewport
                if (map.getBounds) {
                    const bounds = map.getBounds();
                    const inView = bounds.contains([currentLng, currentLat]);
                }
            }

            const y = Math.sin(END_POS.lng - START_POS.lng) * Math.cos(END_POS.lat);
            const x = Math.cos(START_POS.lat) * Math.sin(END_POS.lat) -
                Math.sin(START_POS.lat) * Math.cos(END_POS.lat) * Math.cos(END_POS.lng - START_POS.lng);
            const bearing = (Math.atan2(y, x) * 180 / Math.PI);

            const source = map.getSource('plane-source') as maplibregl.GeoJSONSource;
            if (source?.setData) {
                source.setData({
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [currentLng, currentLat] },
                    properties: { rotation: bearing + 75 }
                });
            } else {
                if (shouldLog) console.warn('[animate] ❌ source.setData not available!');
            }

            // Check layers exist before toggling
            const planeLayerExists = !!map.getLayer('plane-layer');
            const shadowLayerExists = !!map.getLayer('plane-shadow-layer');

            if (shouldLog) {
            }

            if (planeLayerExists && map.getLayoutProperty('plane-layer', 'visibility') !== 'visible') {
                map.setLayoutProperty('plane-layer', 'visibility', 'visible');
            }
            if (shadowLayerExists && map.getLayoutProperty('plane-shadow-layer', 'visibility') !== 'visible') {
                map.setLayoutProperty('plane-shadow-layer', 'visibility', 'visible');
            }
        } else {
            ['plane-layer', 'plane-shadow-layer'].forEach(id => {
                if (map.getLayer(id) && map.getLayoutProperty(id, 'visibility') !== 'none') {
                    map.setLayoutProperty(id, 'visibility', 'none');
                }
            });
        }

        if (isAnimatingRef.current) requestRef.current = requestAnimationFrame(animate);
    }, []);

    const startAnimation = useCallback(() => {
        if (isAnimatingRef.current) {
            return;
        }
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

    const handleStyleData = useCallback(() => {
        const map = mapInstanceRef.current;
        if (map) loadImages(map);
    }, [loadImages]);

    const onMapLoad = useCallback((event: any) => {
        const map = event.target;
        mapInstanceRef.current = map;

        map.flyTo({ zoom: 11, duration: 4500, essential: true });
        loadImages(map);

        setTimeout(() => {
            if (isMountedRef.current) {
                handleSetZoomFinished(true);
            }
        }, 4500);

        startAnimation();

        map.off('styledata', handleStyleData);
        map.on('styledata', handleStyleData);
    }, [loadImages, startAnimation, handleStyleData]);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
            stopAnimation();
            const map = mapInstanceRef.current;
            if (map) map.off('styledata', handleStyleData);
        };
    }, [stopAnimation, handleStyleData]);

    return (
        <div className="w-full h-full relative overflow-hidden">
            <Map
                mapLib={maplibregl}
                initialViewState={{ longitude: 88.3639, latitude: 22.5726, zoom: 4 }}
                onLoad={onMapLoad}
                style={{ width: '100%', height: '100%' }}
                mapStyle={theme === 'dark' || theme === 'vibe'
                    ? "https://api.maptiler.com/maps/basic-v2-dark/style.json?key=w66xaM0hp1KMOXBriVJp"
                    : "https://api.maptiler.com/maps/basic-v2-light/style.json?key=w66xaM0hp1KMOXBriVJp"}
                attributionControl={false}
                dragPan={false}
                scrollZoom={false}
                doubleClickZoom={false}
                reuseMaps={true}
            >
                <Marker longitude={88.3639} latitude={22.5726} anchor="center">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                    </span>
                </Marker>

                {theme === 'vibe' && isZoomFinished && (
                    <BalloonMarker isReady={isZoomFinished} />
                )}

                <Source id="plane-source" type="geojson" data={initialFeature} />

                {/* ✅ Always render layers - don't gate on imagesLoaded */}
                {/* Gating caused layers to not exist when animation tried to show them */}
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
                        'visibility': 'none'
                    }}
                    paint={{ 'icon-opacity': 0.6, 'icon-translate': [15, 15] }}
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
                        'visibility': 'none'
                    }}
                />
            </Map>

            <div className="absolute inset-0 pointer-events-none z-10 opacity-40 mix-blend-overlay">
                <div className="absolute top-0 left-0 w-[200%] h-full flex animate-clouds">
                    <img src="/cloud.webp" alt="clouds" className="w-1/2 h-full object-cover" />
                    <img src="/cloud.webp" alt="clouds" className="w-1/2 h-full object-cover" />
                </div>
            </div>
        </div>
    );
}