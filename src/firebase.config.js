import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjDHMDbDEwSPO-FbPTMoaIT7Y4SbKIq20",
  authDomain: "thee-big.firebaseapp.com",
  projectId: "thee-big",
  storageBucket: "thee-big.appspot.com",
  messagingSenderId: "773682224557",
  appId: "1:773682224557:web:8086ec3471912a36e19524",
  measurementId: "G-EZK6W3DFH0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
