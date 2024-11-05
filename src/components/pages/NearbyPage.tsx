import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type NearbyPageProps = {
    route: RouteProp<MainStackParamList, "Nearby">,
    navigation: FrameNavigationProp<MainStackParamList, "Nearby">,
};

export function NearbyPage({ navigation }: NearbyPageProps) {
    return (
        <gridLayout rows="auto, *" className="p-4">
            <stackLayout row={0} className="mb-4">
                <button className="bg-blue-500 text-white p-2 rounded-lg">
                    Filter Distance
                </button>
            </stackLayout>
            <listView
                row={1}
                items={[
                    { name: "Location 1", distance: "0.5 km" },
                    { name: "Location 2", distance: "1.2 km" },
                    { name: "Location 3", distance: "2.0 km" },
                ]}
                itemTemplate={(item) => (
                    <gridLayout columns="*, auto" className="p-2 border-b border-gray-200">
                        <stackLayout col={0}>
                            <label className="text-lg font-bold">{item.name}</label>
                            <label className="text-gray-500">{item.distance}</label>
                        </stackLayout>
                        <button 
                            col={1}
                            className="bg-red-500 text-white p-2 rounded"
                            text="Delete"
                        />
                    </gridLayout>
                )}
            />
        </gridLayout>
    );
}