// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const env = import.meta.env;
const pick = (...values) => values.find((value) => typeof value === 'string' && value.trim())?.trim();

const firebaseConfig = {
    apiKey: pick(env.VITE_FIREBASE_API_KEY, env.VITE_apiKey),
    authDomain: pick(env.VITE_FIREBASE_AUTH_DOMAIN, env.VITE_authDomain),
    projectId: pick(env.VITE_FIREBASE_PROJECT_ID, env.VITE_projectId),
    storageBucket: pick(env.VITE_FIREBASE_STORAGE_BUCKET, env.VITE_storageBucket),
    messagingSenderId: pick(env.VITE_FIREBASE_MESSAGING_SENDER_ID, env.VITE_messagingSenderId),
    appId: pick(env.VITE_FIREBASE_APP_ID, env.VITE_appId),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;