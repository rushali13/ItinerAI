// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBES9zcAt1HpZl4y-UKxjPEKMMZ3Umg5n8",
	authDomain: "ai-trip-planner-8a418.firebaseapp.com",
	projectId: "ai-trip-planner-8a418",
	storageBucket: "ai-trip-planner-8a418.firebasestorage.app",
	messagingSenderId: "838297908983",
	appId: "1:838297908983:web:ed4ce73c15b25cf2a285f2",
	measurementId: "G-9XKR0YBEVP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
