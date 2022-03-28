import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import './styling/tailwind.output.css';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyDwiYUN-zDZBeAc8QaH9WFDftkqW1XXDdQ",
  authDomain: "oneyearnightmarefirstsite.firebaseapp.com",
  projectId: "oneyearnightmarefirstsite",
  storageBucket: "oneyearnightmarefirstsite.appspot.com",
  messagingSenderId: "81199581232",
  appId: "1:81199581232:web:c391d9d9ab5aaed20745f5",
  measurementId: "G-DKRZFY2R89"
};
const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
