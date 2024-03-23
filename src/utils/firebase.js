// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARO56lPlycaGK44jpb6g3A9vT7ABMvke0",
  authDomain: "netflix-gpt-4c2c1.firebaseapp.com",
  projectId: "netflix-gpt-4c2c1",
  storageBucket: "netflix-gpt-4c2c1.appspot.com",
  messagingSenderId: "63297254519",
  appId: "1:63297254519:web:885ea874bb2eb1dec24272",
  measurementId: "G-YPPJXXC2JP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
