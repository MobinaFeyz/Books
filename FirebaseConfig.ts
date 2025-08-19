import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: "AIzaSyDsilmCApHew5OfQkI5v2hF964P-gw3v8I",
    authDomain: "books-21439.firebaseapp.com",
    projectId: "books-21439",
    storageBucket: "books-21439.appspot.com",  // Fixed the storage bucket name
    messagingSenderId: "437315924515",
    appId: "1:437315924515:web:29c7ce6cbd40d8744d3796"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with React Native persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };

