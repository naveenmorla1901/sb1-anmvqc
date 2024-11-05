import { ApiService } from './api';
import { DatabaseService } from './database';

export class InstagramService {
    private api: ApiService;
    private db: DatabaseService;

    constructor(api: ApiService, db: DatabaseService) {
        this.api = api;
        this.db = db;
    }

    async processInstagramLink(url: string): Promise<{
        id: number;
        title: string;
        description: string;
        latitude: number;
        longitude: number;
    }> {
        // Get location data from backend
        const locationData = await this.api.processInstagramLink(url);

        // Save to local database
        const id = await this.db.addLocation({
            title: locationData.title,
            description: locationData.description,
            latitude: locationData.latitude,
            longitude: locationData.longitude
        });

        return {
            id,
            ...locationData
        };
    }
}