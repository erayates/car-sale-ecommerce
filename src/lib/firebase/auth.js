// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdc8VSaDF1bkXItnT0b4_pQyaHIoHhHcA",
  authDomain: "car-sale-ecommerce-website.firebaseapp.com",
  projectId: "car-sale-ecommerce-website",
  storageBucket: "car-sale-ecommerce-website.appspot.com",
  messagingSenderId: "345448386930",
  appId: "1:345448386930:web:6f963fe059bac7c7da8deb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage();
