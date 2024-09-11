import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { auth, SIGNIN_PAGE_PATH } from "../../..";
import DisplayNameForm from "../../settings/DisplayNameForm";
import EmailForm from "../../settings/EmailForm";
import DeleteAccountButton from "./DeleteAccountButton";
import { useAuthState } from "react-firebase-hooks/auth";

import { BigSpinner } from "../../generic/loading/Spinners";
import ProfilePicEditor from "./ProfilePicEditor";

const UserProfile = () => {
  const [user, loading] = useAuthState(auth)
  const [_, setIsInit] = useState(false);

  if (loading) {
    return(<div className="ml-auto mr-auto my-8"><BigSpinner/></div>)
  }

  if (user === null) {
    return <Navigate to={SIGNIN_PAGE_PATH} />
  }

  if (user.displayName === null) {
    return <InitializeInfo onSubmit={() => setIsInit(true)}/>
  }

  return <DisplayInfo />
};

const InitializeInfo = (props) => {
  return (
    <div className="max-w-lg ml-auto mr-auto px-2">
      <div className="text-left text-xl font-header font-bold ml-2 my-4">
        Set Up Profile
      </div>
      <DisplayNameForm onSuccessAction={() => {props.onSubmit()}} />
      <SignOutButton />
    </div>
  );
};

const DisplayInfo = () => {
  return (
    <div className=" ml-auto mr-auto">
      <div className="px-2 mr-auto ml-auto">
        <div className="text-left text-xl font-header font-bold ml-2 my-4">
          User Settings
        </div>
        <div className="flex justify-center md:justify-between">
          <ProfilePicEditor />
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
