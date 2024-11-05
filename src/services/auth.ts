import { Observable } from "@nativescript/core";

export interface User {
    id: string;
    email: string;
    name: string;
    token?: string;
}

class AuthService extends Observable {
    private currentUser: User | null = null;
    private readonly TOKEN_KEY = "auth_token";

    async login(email: string, password: string): Promise<User> {
        // TODO: Implement actual login logic with Django backend
        throw new Error("Not implemented");
    }

    async register(email: string, password: string, name: string): Promise<User> {
        // TODO: Implement actual registration logic with Django backend
        throw new Error("Not implemented");
    }

    async loginWithSocial(provider: string): Promise<User> {
        // TODO: Implement social login logic
        throw new Error("Not implemented");
    }

    async logout(): Promise<void> {
        this.currentUser = null;
        // TODO: Implement logout logic with Django backend
    }

    getUser(): User | null {
        return this.currentUser;
    }

    isAuthenticated(): boolean {
        return this.currentUser !== null;
    }
}