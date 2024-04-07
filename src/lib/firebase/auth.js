// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk3CGpz1nAa0oKMY9sFklChU5f2BWP3pA",
  authDomain: "car-sale-ecommerce.firebaseapp.com",
  projectId: "car-sale-ecommerce",
  storageBucket: "car-sale-ecommerce.appspot.com",
  messagingSenderId: "840958025909",
  appId: "1:840958025909:web:db988139c10dc9b823defc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export async function createUserWithEmailandPwd(email, password) {
  return _createUserWithEmailandPwd(auth, email, password);
}
