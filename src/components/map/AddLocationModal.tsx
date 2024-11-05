import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface AddLocationModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (location: { title: string; description: string }) => void;
    initialValues?: { title: string; description: string };
}

export function AddLocationModal({ visible, onClose, onSave, initialValues }: AddLocationModalProps) {
    const [title, setTitle] = React.useState(initialValues?.title || "");
    const [description, setDescription] = React.useState(initialValues?.description || "");

    return (
        <absoluteLayout visibility={visible ? "visible" : "collapsed"}>
            <gridLayout
                className="bg-black opacity-50"
                width="100%"
                height="100%"
                onTap={onClose}
            />
            <stackLayout
                className="bg-white rounded-lg p-4 w-4/5 self-center"
                verticalAlignment="middle"
            >
                <label className="text-xl font-bold mb-4">
                    {initialValues ? "Edit Location" : "Add Location"}
                </label>
                <textField
                    className="p-4 border rounded-lg mb-4"
                    hint="Location Title"
                    text={title}
                    onTextChange={(e) => setTitle(e.value)}
                />
                <textField
                    className="p-4 border rounded-lg mb-4"
                    hint="Description"
                    text={description}
                    onTextChange={(e) => setDescription(e.value)}
                />
                <button
                    className="bg-blue-500 text-white p-4 rounded-lg"
                    onTap={() => {
                        onSave({ title, description });
                        onClose();
                    }}
                >
                    Save Location
                </button>
            </stackLayout>
        </absoluteLayout>
    );
}