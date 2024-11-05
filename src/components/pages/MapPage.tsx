import { Dialogs, WebView } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import * as Geolocation from '@nativescript/geolocation';
import { AddLocationModal } from '../map/AddLocationModal';
import { DatabaseService } from '../../services/database';

type MapPageProps = {
    route: RouteProp<MainStackParamList, "Map">,
    navigation: FrameNavigationProp<MainStackParamList, "Map">,
};

export function MapPage({ navigation }: MapPageProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [currentLocation, setCurrentLocation] = React.useState<{ lat: number; lng: number } | null>(null);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [locations, setLocations] = React.useState<Array<{id: number; title: string; latitude: number; longitude: number}>>([]);
    const webViewRef = React.useRef<WebView>();
    const db = React.useMemo(() => new DatabaseService(), []);

    React.useEffect(() => {
        getCurrentLocation();
        loadLocations();
    }, []);

    const mapHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
            <style>
                #map { height: 100vh; width: 100vw; margin: 0; padding: 0; }
                body { margin: 0; padding: 0; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var map = L.map('map').setView([${currentLocation?.lat || 0}, ${currentLocation?.lng || 0}], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);

                window.addMarker = function(lat, lng, title) {
                    L.marker([lat, lng]).addTo(map)
                        .bindPopup(title)
                        .openPopup();
                };

                window.setView = function(lat, lng) {
                    map.setView([lat, lng], 13);
                };
            </script>
        </body>
        </html>
    `;

    async function getCurrentLocation() {
        try {
            setIsLoading(true);
            const hasPermission = await Geolocation.enableLocationRequest();
            if (hasPermission) {
                const location = await Geolocation.getCurrentLocation({
                    desiredAccuracy: 3,
                    maximumAge: 5000,
                    timeout: 10000
                });
                const newLocation = {
                    lat: location.latitude,
                    lng: location.longitude
                };
                setCurrentLocation(newLocation);
                if (webViewRef.current) {
                    webViewRef.current.executeJavaScript(
                        `setView(${newLocation.lat}, ${newLocation.lng});`
                    );
                }
            }
        } catch (error) {
            console.error('Failed to get location:', error);
            Dialogs.alert({
                title: 'Error',
                message: 'Failed to get your location',
                okButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function loadLocations() {
        const savedLocations = await db.getLocations();
        setLocations(savedLocations);
        savedLocations.forEach(loc => {
            if (webViewRef.current) {
                webViewRef.current.executeJavaScript(
                    `addMarker(${loc.latitude}, ${loc.longitude}, "${loc.title}");`
                );
            }
        });
    }

    async function handleLocationSave(data: { title: string; description: string }) {
        if (!currentLocation) return;

        try {
            await db.addLocation({
                title: data.title,
                description: data.description,
                latitude: currentLocation.lat,
                longitude: currentLocation.lng
            });
            
            await loadLocations();
            setShowAddModal(false);
            
            Dialogs.alert({
                title: 'Success',
                message: 'Location saved successfully',
                okButtonText: 'OK'
            });
        } catch (error) {
            console.error('Failed to save location:', error);
            Dialogs.alert({
                title: 'Error',
                message: 'Failed to save location',
                okButtonText: 'OK'
            });
        }
    }

    return (
        <gridLayout rows="auto, *">
            <stackLayout row={0} className="p-4 bg-white border-b border-gray-200">
                <textField
                    hint="Search locations..."
                    className="p-2 bg-gray-100 rounded font-medium"
                />
            </stackLayout>
            
            <gridLayout row={1}>
                <webView
                    ref={webViewRef}
                    src={`data:text/html;base64,${Buffer.from(mapHtml).toString('base64')}`}
                />
                
                {isLoading && (
                    <activityIndicator
                        busy={true}
                        className="text-blue-500"
                    />
                )}
                
                <button
                    className="bg-blue-500 text-white p-4 rounded-full"
                    text="+"
                    horizontalAlignment="right"
                    verticalAlignment="bottom"
                    margin="16"
                    width="60"
                    height="60"
                    onTap={() => setShowAddModal(true)}
                />
            </gridLayout>

            <AddLocationModal
                visible={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleLocationSave}
            />
        </gridLayout>
    );
}