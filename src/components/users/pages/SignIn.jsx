import * as firebaseui from "firebaseui";
import { EmailAuthProvider } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { auth } from "../../..";

const getUiConfig = () => {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType;
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "<url-to-redirect-to-on-success>",
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
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };
  return uiConfig;
};

const SignIn = () => {
  useEffect(() => {
    var ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", getUiConfig());
    return () => {
      ui.delete();
    };
  }, []);

  return (
    <div>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
};

export default SignIn;