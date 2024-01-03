import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDYDOjA0i7_wOYWaHgWj-u00UzHxdRfcQ",
  authDomain: "dropbox-clone-fa895.firebaseapp.com",
  projectId: "dropbox-clone-fa895",
  storageBucket: "dropbox-clone-fa895.appspot.com",
  messagingSenderId: "514155067685",
  appId: "1:514155067685:web:3f30d7941887a42b8702cc",
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
