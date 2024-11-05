import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { Dialogs } from "@nativescript/core";

type RegisterScreenProps = {
    route: RouteProp<MainStackParamList, "Register">,
    navigation: FrameNavigationProp<MainStackParamList, "Register">,
};

export function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Dialogs.alert({
                title: "Error",
                message: "Please fill in all fields",
                okButtonText: "OK"
            });
            return;
        }

        setIsLoading(true);
        // Simulate registration delay
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("Map");
        }, 1000);
    };

    return (
        <flexboxLayout className="p-8 h-full bg-gray-100">
            <stackLayout className="w-full">
                {/* Title */}
                <label className="text-4xl font-bold text-center text-blue-500 mb-2">
                    Create Account
                </label>
                <label className="text-gray-600 text-center mb-12">
                    Join Memory Map today
                </label>

                {/* Registration Form */}
                <stackLayout className="bg-white p-6 rounded-lg shadow-md">
                    <textField
                        className="p-4 border rounded-lg mb-4 font-primary"
                        hint="Full Name"
                        text={name}
                        onTextChange={(e) => setName(e.value)}
                        editable={!isLoading}
                    />
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
                    
                    {/* Register Button */}
                    <button
                        className="bg-blue-500 text-white p-4 rounded-lg mb-4 font-primary"
                        onTap={handleRegister}
                        isEnabled={!isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Register"}
                    </button>

                    {/* Login Link */}
                    <button
                        className="text-blue-500 text-center font-primary"
                        onTap={() => navigation.navigate("Login")}
                        isEnabled={!isLoading}
                    >
                        Already have an account? Login
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