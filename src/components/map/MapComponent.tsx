import * as React from "react";
import { WebView } from "@nativescript/core";
import { StyleSheet } from "react-nativescript";

interface MapComponentProps {
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
  markers?: Array<{ lat: number; lng: number; title: string }>;
}

export function MapComponent({ onLocationSelect, initialLocation, markers = [] }: MapComponentProps) {
    const webViewRef = React.useRef<WebView>();
    const [isMapReady, setIsMapReady] = React.useState(false);

    const mapHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
            <style>
                #map { height: 100vh; width: 100vw; }
                body { margin: 0; padding: 0; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var map = L.map('map').setView([${initialLocation?.lat || 0}, ${initialLocation?.lng || 0}], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);

                map.on('click', function(e) {
                    window.nsWebViewBridge.emit('locationSelected', {
                        lat: e.latlng.lat,
                        lng: e.latlng.lng
                    });
                });

                window.addMarker = function(lat, lng, title) {
                    L.marker([lat, lng]).addTo(map)
                        .bindPopup(title)
                        .openPopup();
                };
            </script>
        </body>
        </html>
    `;

    React.useEffect(() => {
        if (webViewRef.current && isMapReady) {
            markers.forEach(marker => {
                webViewRef.current.executeJavaScript(
                    `addMarker(${marker.lat}, ${marker.lng}, "${marker.title}")`
                );
            });
        }
    }, [markers, isMapReady]);

    return (
        <webView
            ref={webViewRef}
            src={`data:text/html;base64,${Buffer.from(mapHtml).toString('base64')}`}
            onLoadFinished={() => setIsMapReady(true)}
            on:locationSelected={(event) => {
                if (onLocationSelect) {
                    onLocationSelect(event.data);
                }
            }}
        />
    );
}