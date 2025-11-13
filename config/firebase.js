// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeYlFf5Y81ohpG6z5c7FQORxL9xHeZbY4",
  authDomain: "allsstore.firebaseapp.com",
  projectId: "allsstore",
  storageBucket: "allsstore.firebasestorage.app",
  messagingSenderId: "750726411325",
  appId: "1:750726411325:web:8bf324a4180e2ed979e654",
  measurementId: "G-LGJDJXNSP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);