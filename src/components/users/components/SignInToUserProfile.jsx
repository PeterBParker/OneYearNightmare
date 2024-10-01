import * as firebaseui from "firebaseui";
import { EmailAuthProvider } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { auth } from "../../..";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import UserProfile from "./UserProfile";
import loginIllo from "../../../assets/login-explanation.png";
import loginExplain from "../../../assets/login-explanation-2.png";
import { functions } from "../../..";
import { httpsCallable } from "@firebase/functions";

const getUiConfig = () => {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        const addUserToList = httpsCallable(functions, "addUserToList");
        addUserToList({ text: "test1" })
          .then((result) => {
            console.log(result.data?.text);
          })
          .catch((error) => {
            console.log(error.code);
          });
        return false;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    //signInSuccessUrl: {"<url-to-redirect-to-on-success>"},
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        // Allow the user the ability to complete sign-in cross device, including
        // the mobile apps specified in the ActionCodeSettings object below.
        forceSameDevice: false,
      },
    ],
    // Terms of service url.
    tosUrl: encodeURI(
      process.env.PUBLIC_URL + "/compliance/termsofservice.html"
    ),
    // Privacy policy url.
    privacyPolicyUrl: encodeURI(
      process.env.PUBLIC_URL + "/compliance/privacypolicy.html"
    ),
  };
  return uiConfig;
};

const SignInToUserProfile = () => {
  const authUser = useFirebaseAuth(auth);

  // TODO Fix the first render of the sign in page before displaying the user profile
  return (
    <React.Fragment>
      {authUser ? (
        <UserProfile user={authUser} />
      ) : (
        <div className="flex flex-col justify-center justify-items-center content-center">
          <div className="ml-auto mr-auto">
            <img
              src={loginIllo}
              width={400}
              className="mr-8"
              alt="explanation that we will never sell your email or data."
            />
          </div>

          <SignIn />
          <div className="mr-auto ml-auto mt-4">
            <img
              src={loginExplain}
              width={300}
              className=""
              alt="explanation that we will send you an email with a login link instead of using a username and password."
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const SignIn = () => {
  useEffect(() => {
    var ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", getUiConfig());
  }, []);

  return (
    <div>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
};

export default SignInToUserProfile;
