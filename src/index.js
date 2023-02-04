import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./styling/tailwind.output.css";

import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const mailchimp = require("@mailchimp/mailchimp_marketing");

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
export const AVATARS_PATH = "user_avatars/";

if (window.location.hostname == "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099"); // to use the emulator run "firebase emulators:start"
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", "9199");
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us11",
});

async function test_mailchimp() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

test_mailchimp();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
