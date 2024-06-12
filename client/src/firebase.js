// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJDdJXBN9uggBWLQzR0GBB4Xxufvz_6qg",
  authDomain: "mern-estate-3b9bb.firebaseapp.com",
  projectId: "mern-estate-3b9bb",
  storageBucket: "mern-estate-3b9bb.appspot.com",
  messagingSenderId: "273195454298",
  appId: "1:273195454298:web:32ac96601aecefeb21ed63"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);