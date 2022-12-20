// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBr-fvwPq3fxYkTFzAt1pdLyadnRqGQGk",
  authDomain: "crunchy-spicy-resturent.firebaseapp.com",
  projectId: "crunchy-spicy-resturent",
  storageBucket: "crunchy-spicy-resturent.appspot.com",
  messagingSenderId: "707148903189",
  appId: "1:707148903189:web:e8b434d625dc89cb74af1c",
  measurementId: "G-FF1XHEPWEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);