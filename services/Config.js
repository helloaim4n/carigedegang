// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWnZrxJdSGF-UIYj0hkeJY_u7ON_ODke8",
  authDomain: "carigedegang.firebaseapp.com",
  databaseURL: "https://carigedegang-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carigedegang",
  storageBucket: "carigedegang.appspot.com",
  messagingSenderId: "494355589954",
  appId: "1:494355589954:web:83bd4ac2ce23d00b9676db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firestore
const db = getFirestore(app);

// Initialize the authentication module
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
}); 

export { db, app, auth};