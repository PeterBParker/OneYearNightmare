import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Firebase Objects and Settings
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

import reportWebVitals from "./reportWebVitals";
import "./styling/tailwind.output.css";
import ComicPageAPI from "./api/ComicPageAPI";
import GlobalErrorPage from "./components/generic/errors/GlobalErrorPage";

// Routes
import App from "./routes/App";
import Creators from "./routes/Creators";
import Support from "./routes/Support";
import Archive from "./routes/Archive";
import ComicViewer from "./routes/ComicViewer";
import Reader from "./routes/Reader";

// Loaders
import { loader as reader_loader } from "./routes/Reader";
import { loader as page_loader } from "./routes/ComicViewer";
import Login from "./routes/Login";
import FinishLogin from "./routes/FinishLogin";
import ProfilePage from "./routes/ProfilePage";

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

export let DOMAIN = "https://monstersandmyriads.com";
// Perform the App Check with ReCaptcha to prevent unauthorized usage of Firestore
if (window.location.hostname === "localhost") {
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_DEV_TOKEN;
  DOMAIN = "http://localhost:3000"
}

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LeYjg4qAAAAANJsmggY0V_OqntdxwqMB3YaS21z"
  ),
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
export const PageAPI = new ComicPageAPI(db, storage);

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", "9199");
  connectFunctionsEmulator(functions, "localhost", 5001);
}

// Declare site-wide constants
export const COMIC_VIEWER_PATH = "/read";
export const SUPPORT_PAGE_PATH = "/support";
export const ARCHIVE_PAGE_PATH = "/archive";
export const CREATIVES_PAGE_PATH = "/creatives";
export const SIGNIN_PAGE_PATH = "/login";
export const FINISH_SIGNIN_PAGE_PATH = "/finish-login"
export const USER_PROFILE_PAGE_PATH = "/profile";
export const BASE_PATH = "/MnMPages/";

export const JOINT_SIG = "Mo and Nate";
export const NO_USER_ID = "null";
export const SNAP_TO_PAGE_PATH = "snap-to-page";
export const MAX_COMMENT_CHARS = 350;

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <GlobalErrorPage />,
    children: [
      {
        path: CREATIVES_PAGE_PATH,
        element: <Creators />,
      },
      {
        path: SUPPORT_PAGE_PATH,
        element: <Support />,
      },
      {
        path: "/",
        element: <Reader />,
        loader: reader_loader(queryClient),
      },
      {
        path: COMIC_VIEWER_PATH,
        element: <Reader />,
        loader: reader_loader(queryClient),
      },
      {
        path: COMIC_VIEWER_PATH + "/:pageUuid",
        element: <ComicViewer />,
        loader: page_loader(queryClient),
      },
      {
        path: COMIC_VIEWER_PATH + "/:pageUuid/:focus",
        element: <ComicViewer />,
        loader: page_loader(queryClient),
      },
      {
        path: ARCHIVE_PAGE_PATH,
        element: <Archive />,
      },
      {
        path: SIGNIN_PAGE_PATH,
        element: <Login />,
      },
      {
        path: FINISH_SIGNIN_PAGE_PATH,
        element: <FinishLogin />,
      },
      {
        path: USER_PROFILE_PAGE_PATH,
        element: <ProfilePage />
      }
    ],
  },
]);
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
