import { DatabaseService } from './database';
import { ApiService } from './api';
import { Observable } from '@nativescript/core';

export class LocationSyncService extends Observable {
    private db: DatabaseService;
    private api: ApiService;
    private syncInterval: number;

    constructor(db: DatabaseService, api: ApiService) {
        super();
        this.db = db;
        this.api = api;
        this.syncInterval = setInterval(() => this.syncLocations(), 300000); // Sync every 5 minutes
    }

    async syncLocations() {
        try {
            const unsyncedLocations = await this.db.getUnsyncedLocations();
            if (unsyncedLocations.length === 0) return;

            await this.api.syncLocations(unsyncedLocations);
            
            for (const location of unsyncedLocations) {
                if (location.id) {
                    await this.db.markAsSynced(location.id);
                }
            }

            this.notify({
                eventName: 'locationsSynced',
                object: this
            });
        } catch (error) {
            console.error('Failed to sync locations:', error);
            this.notify({
                eventName: 'syncError',
                object: this,
                error
            });
        }
    }

    destroy() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
    }
}