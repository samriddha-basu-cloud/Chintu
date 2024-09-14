// src/services/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAm-wsVzx2jWSZIQ3RUv5XytxuYN_CBPao',
    authDomain: 'stockeaze-45957.firebaseapp.com',
    projectId: 'stockeaze-45957',
    storageBucket: 'stockeaze-45957.appspot.com',
    messagingSenderId: '909385933915',
    appId: '1:909385933915:web:65affc2f668171f0728b7e',
    measurementId: 'G-EDE7VZ27F0'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firestore = getFirestore(app);
const auth = getAuth(app);

// Initialize Firebase Analytics (only available if using the web in a browser environment)
// let analytics;
// if (typeof window !== 'undefined') {
//     analytics = getAnalytics(app);
// }

// Export the initialized Firebase services
export { app, firestore, auth };