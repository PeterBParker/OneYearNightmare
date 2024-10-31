import { SIGNIN_PAGE_PATH, USER_PROFILE_PAGE_PATH, auth } from "..";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { PageLoadingSpinner } from "../components/generic/loading/Spinners";
import { useNavigate } from "react-router-dom/dist";
import { generateAvatarData, storeUserAvatar, getOldAvatarRef } from "../components/users/avatarHelpers";
import { generateDisplayName, getUserData, setUserData, updateUserData } from "../api/ComicPageAPI";
import { USER_DISPLAY_NAME, USER_URL } from "../api/RefKeys";
import { getDownloadURL } from "firebase/storage";
import { setAuthDisplayName } from "../components/users/utils";

function isEmpty(ob){
  for(var i in ob){ return false;}
 return true;
}

export default function FinishLogin() {
  const navigate = useNavigate();
  const NUM_OF_USER_PROPERTIES = 2;

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
        .then((user) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // Query for their data and then set values if none exist
          getUserData(user.user.uid).then(async (data) => {
            let placeholderUserData = {}
            // checks if there isn't a prexisting display name stored
            if ((data === undefined) || !(USER_DISPLAY_NAME in data) || (data[USER_DISPLAY_NAME] == null)) {
              // generate placeholder display name
              const placeholderName = generateDisplayName();
              placeholderUserData[USER_DISPLAY_NAME] = placeholderName
              setAuthDisplayName(placeholderName);
            }
            // checks if there isn't a preexisting user url stored
            if ((data === undefined) || !(USER_URL in data) || (data[USER_URL] == null)) {
              // first check if they have an existing avatar and use that over the placeholder
              const oldAvatarRef = await getOldAvatarRef(user.user.uid);
              try {
                placeholderUserData[USER_URL] = await getDownloadURL(oldAvatarRef);
              } catch (error) {
                // generate placeholder avatar
                const newSeed = generateDisplayName();
                const avatarData = generateAvatarData(newSeed);
                const placeholderURL = await storeUserAvatar(user.uid, avatarData);
                placeholderUserData[USER_URL] = placeholderURL;
              }

            }
            if (! isEmpty(placeholderUserData)) {
              console.log("For user ", user.user.uid, " with data ", placeholderUserData)
              // if we have to set every attribute of the user because none of it existed, create a new user
              if (Object.keys(placeholderUserData).length === NUM_OF_USER_PROPERTIES) {
                await setUserData(user.user.uid, placeholderUserData)
              } else {
                // update the user with the new data
                await updateUserData(user.user.uid, placeholderUserData)
              }
              
            }
            navigate(USER_PROFILE_PAGE_PATH)
          }).catch((error) => {
            console.log(error)
            alert("Oops! We encountered a problem trying to log you in. Try again or report to nate-and-mo@monstersandmyriads.com.")
            navigate(SIGNIN_PAGE_PATH)
          })
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