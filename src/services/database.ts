import { ApplicationSettings } from "@nativescript/core";

export interface Location {
    id?: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
    syncedWithServer: boolean;
}

export class DatabaseService {
    private readonly LOCATIONS_KEY = "saved_locations";
    private lastId: number;

    constructor() {
        this.lastId = this.getLastId();
    }

    private getLastId(): number {
        return parseInt(ApplicationSettings.getString("last_location_id", "0"), 10);
    }

    private setLastId(id: number): void {
        ApplicationSettings.setString("last_location_id", id.toString());
    }

    private getLocationsFromStorage(): Location[] {
        const locationsStr = ApplicationSettings.getString(this.LOCATIONS_KEY, "[]");
        return JSON.parse(locationsStr);
    }

    private saveLocationsToStorage(locations: Location[]): void {
        ApplicationSettings.setString(this.LOCATIONS_KEY, JSON.stringify(locations));
    }

    async addLocation(location: Omit<Location, 'id' | 'createdAt' | 'updatedAt' | 'syncedWithServer'>): Promise<number> {
        const locations = this.getLocationsFromStorage();
        const now = new Date().toISOString();
        const newId = ++this.lastId;
        
        const newLocation: Location = {
            id: newId,
            ...location,
            createdAt: now,
            updatedAt: now,
            syncedWithServer: false
        };

        locations.push(newLocation);
        this.saveLocationsToStorage(locations);
        this.setLastId(newId);

        return newId;
    }

    async getLocations(): Promise<Location[]> {
        return this.getLocationsFromStorage();
    }

    async updateLocation(location: Location): Promise<void> {
        const locations = this.getLocationsFromStorage();
        const index = locations.findIndex(loc => loc.id === location.id);
        
        if (index !== -1) {
            locations[index] = {
                ...location,
                updatedAt: new Date().toISOString(),
                syncedWithServer: false
            };
            this.saveLocationsToStorage(locations);
        }
    }

    async deleteLocation(id: number): Promise<void> {
        const locations = this.getLocationsFromStorage();
        const filteredLocations = locations.filter(loc => loc.id !== id);
        this.saveLocationsToStorage(filteredLocations);
    }

    async getUnsyncedLocations(): Promise<Location[]> {
        const locations = this.getLocationsFromStorage();
        return locations.filter(loc => !loc.syncedWithServer);
    }

    async markAsSynced(id: number): Promise<void> {
        const locations = this.getLocationsFromStorage();
        const index = locations.findIndex(loc => loc.id === id);
        
        if (index !== -1) {
            locations[index].syncedWithServer = true;
            this.saveLocationsToStorage(locations);
        }
    }
}