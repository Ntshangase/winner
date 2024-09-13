import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyD-kXwddro8I6mu03qUyK9gh8VwbM4PlLc",
  authDomain: "cloud-8f1de.firebaseapp.com",
  databaseURL: "https://cloud-8f1de-default-rtdb.firebaseio.com/",
  projectId: "cloud-8f1de",
  storageBucket: "cloud-8f1de.appspot.com",
  messagingSenderId: "499005967227",
  appId: "1:499005967227:web:fa9e9fa830b7ff89900bde",
  measurementId: "G-1JGMND185R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app); // Export Firebase Storage