// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPw8xI_3AHmYjR1fB99C_Psp-CFtT0HcE",
  authDomain: "broodl-c3ac1.firebaseapp.com",
  projectId: "broodl-c3ac1",
  storageBucket: "broodl-c3ac1.appspot.com",
  messagingSenderId: "1006307771214",
  appId: "1:1006307771214:web:3bd8b50f1aef653afd941f",
  measurementId: "G-5VPC1NXSSW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

