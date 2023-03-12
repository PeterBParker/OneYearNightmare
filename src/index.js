import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./styling/tailwind.output.css";

import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Initialize the Firebase Application
var firebaseConfig = {
  apiKey: "AIzaSyDwiYUN-zDZBeAc8QaH9WFDftkqW1XXDdQ",
  authDomain: "oneyearnightmarefirstsite.firebaseapp.com",
  projectId: "oneyearnightmarefirstsite",
  messagingSenderId: "81199581232",
  appId: "1:81199581232:web:c391d9d9ab5aaed20745f5",
  measurementId: "G-DKRZFY2R89",
  storageBucket: "gs://oneyearnightmarefirstsite.appspot.com/",
};
const firebaseApp = initializeApp(firebaseConfig);

// Perform the App Check with ReCaptcha to prevent unauthorized usage of Firestore
if (window.location.hostname === "localhost") {
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_DEV_TOKEN;
}

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider("6Lc4Nx4fAAAAAAp7ZK-t2_1cMEZyfrhdTabLb8Tj"),
  isTokenAutoRefreshEnabled: true,
});

// Initialize the Firebase service objects
export const analytics = getAnalytics(firebaseApp);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const functions = getFunctions(firebaseApp, "us-central1");
export const AVATARS_PATH = "user_avatars/";
export const BOOKMARK_KEY = "mxmBookmarkedPage";

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099"); // to use the emulator run "firebase emulators:start"
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", "9199");
  connectFunctionsEmulator(functions, "localhost", 5001);
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
