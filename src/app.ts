import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';
import { Dialogs } from "@nativescript/core";

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: true });

// Handle any uncaught errors
global.errorHandler = (e) => {
    console.error(e);
    Dialogs.alert({
        title: "Error",
        message: "An unexpected error occurred.",
        okButtonText: "OK"
    });
};

ReactNativeScript.start(React.createElement(MainStack, {}, null));