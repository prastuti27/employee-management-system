import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// import dotenv from "dotenv";
// dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyDMfL5JehCdel_mKtPtNSXEddBeGX_eydg", //process.env.api_key
  authDomain: "hr-management-468e4.firebaseapp.com",
  projectId: "hr-management-468e4",
  storageBucket: "hr-management-468e4.appspot.com",
  messagingSenderId: "339996239639",
  appId: "1:339996239639:web:228f0eabdd69c94d3db952",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { app, auth, db };
