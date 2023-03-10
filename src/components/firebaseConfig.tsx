import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyButlgEZRXZJr0SEAOf-uwalaYSqwmVo2s",
  authDomain: "spotem-4b517.firebaseapp.com",
  databaseURL: "https://spotem-4b517-default-rtdb.firebaseio.com",
  projectId: "spotem-4b517",
  storageBucket: "spotem-4b517.appspot.com",
  messagingSenderId: "209430026627",
  appId: "1:209430026627:web:350f6edcc62b5be5ebfeb6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
