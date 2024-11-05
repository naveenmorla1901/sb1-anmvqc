import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { MapPage } from "./pages/MapPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NearbyPage } from "./pages/NearbyPage";
import { LoginScreen } from "./auth/LoginScreen";
import { RegisterScreen } from "./auth/RegisterScreen";
import { MainStackParamList } from "../NavigationParamList";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => {
    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#65adf1'
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    gestureEnabled: true
                }}
            >
                <StackNavigator.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <StackNavigator.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <StackNavigator.Screen
                    name="Map"
                    component={MapPage}
                    options={({ navigation }) => ({
                        title: 'Memory Map',
                        headerLeft: () => null,
                        headerRight: () => (
                            <flexboxLayout className="mr-4">
                                <button
                                    className="text-white mr-4 p-2"
                                    onTap={() => navigation.navigate('Nearby')}
                                    text="📍 Nearby"
                                />
                                <button
                                    className="text-white p-2"
                                    onTap={() => navigation.navigate('Profile')}
                                    text="👤 Profile"
                                />
                            </flexboxLayout>
                        )
                    })}
                />
                <StackNavigator.Screen
                    name="Profile"
                    component={ProfilePage}
                />
                <StackNavigator.Screen
                    name="Nearby"
                    component={NearbyPage}
                />
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    );
};