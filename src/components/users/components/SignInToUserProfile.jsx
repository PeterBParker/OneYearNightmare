import * as firebaseui from "firebaseui";
import {
  EmailAuthProvider,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { auth } from "../../..";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import UserProfile from "./UserProfile";
import { storeUserAvatar } from "../avatarHelpers";
import loginIllo from "../../../assets/login-explanation.png";
import loginExplain from "../../../assets/login-explanation-2.png";

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
    signInSuccessUrl: "<url-to-redirect-to-on-success>",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        // Allow the user the ability to complete sign-in cross device, including
        // the mobile apps specified in the ActionCodeSettings object below.
        forceSameDevice: false,
        emailLinkSignIn: function () {
          return {
            url: "https://www.monstersandmyriads.com/login",
            handleCodeInApp: true,
          };
        },
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
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem("emailForSignIn");
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }

  // TODO Fix the first render of the sign in page before displaying the user profile
  return (
    <React.Fragment>
      {authUser ? (
        <UserProfile user={authUser} />
      ) : (
        <div className="flex flex-col justify-center justify-items-center content-center">
          <div className="ml-auto mr-auto">
            <img src={loginIllo} width={400} className="mr-8" />
          </div>

          <SignIn />
          <div className="mr-auto ml-auto mt-4">
            <img src={loginExplain} width={200} className="ml-32 md:ml-56" />
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
    return () => {
      ui.delete();
    };
  }, []);

  return (
    <div>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
};

export default SignInToUserProfile;
