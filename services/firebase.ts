
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Your web app's Firebase configuration from the request
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
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
