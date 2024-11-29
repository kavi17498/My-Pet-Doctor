// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyFqE1HOirfrM9qwe-lf_Y0qP4a5G0RsI",
  authDomain: "my-pet-doctor-fbb9d.firebaseapp.com",
  projectId: "my-pet-doctor-fbb9d",
  storageBucket: "my-pet-doctor-fbb9d.firebasestorage.app",
  messagingSenderId: "806776072906",
  appId: "1:806776072906:web:d2b13b2de77a9a9e20e233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
