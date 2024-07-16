// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY4J1d9GF4aKDP6TUlgTa14_ieRPih08Y",
  authDomain: "fieldproject-ecab7.firebaseapp.com",
  projectId: "fieldproject-ecab7",
  storageBucket: "fieldproject-ecab7.appspot.com",
  messagingSenderId: "310840282684",
  appId: "1:310840282684:web:d6c26367dda57afde6bd39",
  measurementId: "G-94KKTFVZCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
console.log("firebase success");
export { app, analytics, storage };