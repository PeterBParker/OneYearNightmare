import { SIGNIN_PAGE_PATH, USER_PROFILE_PAGE_PATH, auth } from "..";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { PageLoadingSpinner } from "../components/generic/loading/Spinners";
import { useNavigate } from "react-router-dom/dist";

export default function FinishLogin() {
  const navigate = useNavigate();

  if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          navigate(USER_PROFILE_PAGE_PATH)
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          console.log(error);
          alert(error);
          alert("Oops! We encountered a problem trying to log you in. Try again or report to nate-and-mo@monstersandmyriads.com.")
          navigate(SIGNIN_PAGE_PATH);
        });
    }
  return(
      <PageLoadingSpinner />
  )
}