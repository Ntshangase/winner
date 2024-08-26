// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwFE6VHrYPcgkX7ruXPIonSLrA6IU9fDM",
  authDomain: "winner-4da95.firebaseapp.com",
  projectId: "winner-4da95",
  databaseURL: "https://winner-4da95-default-rtdb.firebaseio.com/",
  storageBucket: "winner-4da95.appspot.com",
  messagingSenderId: "537322194131",
  appId: "1:537322194131:web:8a3087b8666714a65f8026",
  measurementId: "G-D24FR52F2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database =  getDatabase(app);

export {database};