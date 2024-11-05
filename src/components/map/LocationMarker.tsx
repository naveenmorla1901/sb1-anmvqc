import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface LocationMarkerProps {
    title: string;
    description?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function LocationMarker({ title, description, onEdit, onDelete }: LocationMarkerProps) {
    return (
        <gridLayout columns="*, auto, auto" className="p-4 bg-white rounded-lg shadow-sm mb-2">
            <stackLayout col={0}>
                <label className="text-lg font-bold">{title}</label>
                {description && (
                    <label className="text-gray-600">{description}</label>
                )}
            </stackLayout>
            {onEdit && (
                <button
                    col={1}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                    text="Edit"
                    onTap={onEdit}
                />
            )}
            {onDelete && (
                <button
                    col={2}
                    className="bg-red-500 text-white p-2 rounded"
                    text="Delete"
                    onTap={onDelete}
                />
            )}
        </gridLayout>
    );
}