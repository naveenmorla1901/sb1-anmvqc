import { knownFolders, path } from "@nativescript/core";

export class MapCacheService {
    private cacheDir: string;

    constructor() {
        this.cacheDir = path.join(knownFolders.documents().path, "map-cache");
        // Ensure cache directory exists
        if (!knownFolders.documents().getFolder("map-cache").exists) {
            knownFolders.documents().getFolder("map-cache").create();
        }
    }

    async saveTile(z: number, x: number, y: number, data: ArrayBuffer): Promise<void> {
        const tilePath = this.getTilePath(z, x, y);
        const file = knownFolders.documents()
            .getFolder("map-cache")
            .getFile(`${z}-${x}-${y}.png`);
        await file.write(data);
    }

    async getTile(z: number, x: number, y: number): Promise<ArrayBuffer | null> {
        const tilePath = this.getTilePath(z, x, y);
        const file = knownFolders.documents()
            .getFolder("map-cache")
            .getFile(`${z}-${x}-${y}.png`);
        
        if (file.exists) {
            return await file.read();
        }
        return null;
    }

    private getTilePath(z: number, x: number, y: number): string {
        return path.join(this.cacheDir, `${z}-${x}-${y}.png`);
    }

    async clearCache(): Promise<void> {
        const cacheFolder = knownFolders.documents().getFolder("map-cache");
        await cacheFolder.clear();
    }
}