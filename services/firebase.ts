
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUZfjP8iomzCRe0SUeHGVmLBz09B-Afr8",
  authDomain: "bank-90ddd.firebaseapp.com",
  databaseURL: "https://bank-90ddd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bank-90ddd",
  storageBucket: "bank-90ddd.firebasestorage.app",
  messagingSenderId: "289369752822",
  appId: "1:289369752822:web:a261ee652850b1b8e058d7",
  measurementId: "G-SHNTS4X7PG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics is optional and only works in browser environments
let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn("Firebase Analytics could not be initialized:", e);
  }
}

export { analytics };
export default app;
