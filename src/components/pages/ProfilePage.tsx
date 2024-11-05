import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type ProfilePageProps = {
    route: RouteProp<MainStackParamList, "Profile">,
    navigation: FrameNavigationProp<MainStackParamList, "Profile">,
};

export function ProfilePage({ navigation }: ProfilePageProps) {
    return (
        <scrollView className="p-4">
            <stackLayout>
                <image
                    src="res://profile_placeholder"
                    className="h-24 w-24 rounded-full mb-4 self-center"
                />
                <label className="text-2xl font-bold text-center mb-4">
                    John Doe
                </label>
                <button 
                    className="bg-gray-200 p-4 rounded-lg mb-2"
                    onTap={() => console.log("Edit Profile")}
                >
                    Edit Profile
                </button>
                <button 
                    className="bg-gray-200 p-4 rounded-lg mb-2"
                    onTap={() => console.log("Settings")}
                >
                    Settings
                </button>
                <button 
                    className="bg-red-500 text-white p-4 rounded-lg"
                    onTap={() => navigation.navigate("Login")}
                >
                    Logout
                </button>
            </stackLayout>
        </scrollView>
    );
}