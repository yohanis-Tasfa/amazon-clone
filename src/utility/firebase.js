// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXcBKpaiXyAHapyO59lu6NHS1sXf8LYwQ",
  authDomain: "clone-72e28.firebaseapp.com",
  projectId: "clone-72e28",
  storageBucket: "clone-72e28.appspot.com",  // FIXED
  messagingSenderId: "116186194904",
  appId: "1:116186194904:web:2c61da9148da43338a88ad",
  measurementId: "G-K4TJFHMEBT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services (v9 modular)
export const auth = getAuth(app);
export const db = getFirestore(app);
