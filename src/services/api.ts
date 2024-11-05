import { Http } from "@nativescript/core";

export class ApiService {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    setToken(token: string) {
        this.token = token;
    }

    private getHeaders(): any {
        const headers = {
            "Content-Type": "application/json"
        };
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }
        return headers;
    }

    async processInstagramLink(url: string): Promise<{
        latitude: number;
        longitude: number;
        title: string;
        description: string;
    }> {
        const response = await Http.request({
            url: `${this.baseUrl}/api/process-instagram`,
            method: "POST",
            headers: this.getHeaders(),
            content: JSON.stringify({ url })
        });

        if (response.statusCode !== 200) {
            throw new Error("Failed to process Instagram link");
        }

        return response.content.toJSON();
    }

    async syncLocations(locations: any[]): Promise<void> {
        const response = await Http.request({
            url: `${this.baseUrl}/api/sync-locations`,
            method: "POST",
            headers: this.getHeaders(),
            content: JSON.stringify({ locations })
        });

        if (response.statusCode !== 200) {
            throw new Error("Failed to sync locations");
        }
    }
}