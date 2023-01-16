import React, { useState } from "react";
import SignOutButton from "./SignOutButton";
import { auth } from "../../..";
import DisplayNameForm from "../../settings/DisplayNameForm";
import EmailForm from "../../settings/EmailForm";
import DeleteAccountButton from "./DeleteAccountButton";
import ProfilePicture from "./ProfilePicture";

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
    <div className="max-w-2xl ml-auto mr-auto">
      <div className="px-2 mr-auto ml-auto">
        <div className="text-left text-xl font-header font-bold ml-2 my-4">
          User Settings
        </div>
        <div className="flex flex-wrap justify-center md:justify-between">
          <ProfilePicture width="200" height="200" />
          <div className="w-full md:w-3/5 min-w-max max-w-xl">
            <DisplayNameForm />
            <EmailForm />
            <div className="flex justify-between my-12 px-2">
              <DeleteAccountButton />
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
