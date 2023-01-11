import React, { useEffect, useState } from "react";
import SignOutButton from "./SignOutButton";
import { auth } from "../../..";
import { getDisplayName } from "../utils";
import DisplayNameForm from "../../settings/DisplayNameForm";
import EmailForm from "../../settings/EmailForm";
import DeleteAccountButton from "./DeleteAccountButton";

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
          <DeleteAccountButton />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
