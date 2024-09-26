// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvCi4JZFsn6eFC1klFikKNfE5UEhJIQ2s",
  authDomain: "whatsapp-demonstration.firebaseapp.com",
  projectId: "whatsapp-demonstration",
  storageBucket: "whatsapp-demonstration.appspot.com",
  messagingSenderId: "623110699885",
  appId: "1:623110699885:web:7afdd53d10c513c8f53864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)