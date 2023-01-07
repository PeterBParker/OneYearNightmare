import React, { useEffect, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../../..";
import { db } from "../../../index";
import { collection, setDoc, doc, Timestamp } from "firebase/firestore";
import { getDisplayName, validateDisplayName } from "../utils";
import DisplayNameForm from "../../settings/DisplayNameForm";
import EmailForm from "../../settings/EmailForm";

const UserProfile = () => {
  const [notInitialized, setNotInitialized] = useState(
    auth.currentUser.displayName === null
  );

  return notInitialized ? (
    <InitializeInfo setNotInitialized={setNotInitialized} />
  ) : (
    <DisplayInfo />
  );
};

const InitializeInfo = (props) => {
  return (
    <div className="max-w-lg ml-auto mr-auto px-2">
      <div className="text-left text-xl font-header font-bold ml-2 my-4">
        Set Up Profile
      </div>
      <DisplayNameForm onSubmitAction={() => props.setNotInitialized(false)} />
      <SignOutButton />
    </div>
  );
};

const DisplayInfo = () => {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    getDisplayName(auth.currentUser.uid).then((name) => {
      setDisplayName(name);
    });
  }, []);

  return (
    <div>
      <div className="max-w-lg ml-auto mr-auto px-2">
        <div className="text-left text-xl font-header font-bold ml-2 my-4">
          User Settings
        </div>
        <div>Profile Picture Placeholder</div>
        <DisplayNameForm />
        <EmailForm />
        <div className="flex justify-between my-12 px-2">
          <div className="rounded bg-red-bad btn text-center px-4 py-2 basis-1/4 font-medium text-lg">
            Delete Account
          </div>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

const SignOutButton = () => {
  return (
    <button
      className="rounded bg-grey-light text-eggshell btn text-center px-4 py-2 basis-1/4 font-medium text-lg"
      onClick={() =>
        signOut(auth)
          .then(() => {
            console.log("Successfully Signed Out!");
          })
          .catch((error) => {
            console.log("Failed to Sign Out. Error:", error);
          })
      }
    >
      Sign Out
    </button>
  );
};

export default UserProfile;
