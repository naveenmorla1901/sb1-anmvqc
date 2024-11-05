import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { Dialogs } from "@nativescript/core";

type LoginScreenProps = {
    route: RouteProp<MainStackParamList, "Login">,
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Dialogs.alert({
                title: "Error",
                message: "Please fill in all fields",
                okButtonText: "OK"
            });
            return;
        }

        setIsLoading(true);
        try {
            // Simulate login
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigation.reset({
                index: 0,
                routes: [{ name: 'Map' }]
            });
        } catch (error) {
            Dialogs.alert({
                title: "Error",
                message: "Login failed. Please try again.",
                okButtonText: "OK"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            navigation.reset({
                index: 0,
                routes: [{ name: 'Map' }]
            });
        } catch (error) {
            Dialogs.alert({
                title: "Error",
                message: "Failed to continue as guest",
                okButtonText: "OK"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <flexboxLayout className="p-8 h-full bg-gray-100">
            <stackLayout className="w-full">
                {/* Logo and Title */}
                <label className="text-4xl font-bold text-center text-blue-500 mb-2">
                    Memory Map
                </label>
                <label className="text-gray-600 text-center mb-12">
                    Save and discover amazing places
                </label>

                {/* Login Form */}
                <stackLayout className="bg-white p-6 rounded-lg shadow-md">
                    <textField
                        className="p-4 border rounded-lg mb-4 font-primary"
                        hint="Email"
                        keyboardType="email"
                        text={email}
                        onTextChange={(e) => setEmail(e.value)}
                        editable={!isLoading}
                    />
                    <textField
                        className="p-4 border rounded-lg mb-6 font-primary"
                        hint="Password"
                        secure={true}
                        text={password}
                        onTextChange={(e) => setPassword(e.value)}
                        editable={!isLoading}
                    />
                    
                    {/* Login Button */}
                    <button
                        className="bg-blue-500 text-white p-4 rounded-lg mb-4 font-primary"
                        onTap={handleLogin}
                        isEnabled={!isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    {/* Guest Login Button */}
                    <button
                        className="bg-gray-200 text-gray-700 p-4 rounded-lg mb-4 font-primary"
                        onTap={handleGuestLogin}
                        isEnabled={!isLoading}
                    >
                        Continue as Guest
                    </button>

                    {/* Register Link */}
                    <button
                        className="text-blue-500 text-center font-primary"
                        onTap={() => navigation.navigate("Register")}
                        isEnabled={!isLoading}
                    >
                        Don't have an account? Register
                    </button>
                </stackLayout>

                {/* Loading Indicator */}
                {isLoading && (
                    <activityIndicator
                        busy={true}
                        className="mt-4"
                    />
                )}
            </stackLayout>
        </flexboxLayout>
    );
}