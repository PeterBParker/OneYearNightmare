import {AuthUI} from 'firebaseui.auth'
import { EmailAuthProvider } from 'firebase/auth'
import React from 'react'
import { auth } from '../../..'
import SignInForm from '../SignInForm'

const SignIn = () => {
    var ui = new AuthUI(auth);
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
              // User successfully signed in.
              // Return type determines whether we continue the redirect automatically
              // or whether we leave that to developer to handle.
              return true;
            },
            uiShown: function() {
              // The widget is rendered.
              // Hide the loader.
              document.getElementById('loader').style.display = 'none';
            }
          },
          // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
          signInFlow: 'popup',
          signInSuccessUrl: '<url-to-redirect-to-on-success>',
          signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            EmailAuthProvider.PROVIDER_ID
          ],
          // Terms of service url.
          tosUrl: '<your-tos-url>',
          // Privacy policy url.
          privacyPolicyUrl: '<your-privacy-policy-url>'
    }
    ui.start("firebaseui-auth-container", uiConfig);
  return (
    <div>
        <h1>Welcome to My Awesome App</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
    </div>
  )
}

export default SignIn