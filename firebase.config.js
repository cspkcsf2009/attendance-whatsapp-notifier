// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNNKhYVu3c7-06bmC1fDWYMAnoYbE_Tds",
    authDomain: "attendance-notifier-afa7a.firebaseapp.com",
    projectId: "attendance-notifier-afa7a",
    storageBucket: "attendance-notifier-afa7a.appspot.com",
    messagingSenderId: "851196078088",
    appId: "1:851196078088:web:e99b1fafb23a55abda89bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };