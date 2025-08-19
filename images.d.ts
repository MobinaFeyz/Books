declare module '*.png' {
    const content: number;
    export default content;
}

// Augment Firebase RN subpath to appease TS when using getReactNativePersistence
declare module 'firebase/auth/react-native' {
    export function getReactNativePersistence(storage: any): any;
}