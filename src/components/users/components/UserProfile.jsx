import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { auth, SIGNIN_PAGE_PATH } from "../../..";
import DisplayNameForm from "../../settings/DisplayNameForm";
import EmailForm from "../../settings/EmailForm";
import DeleteAccountButton from "./DeleteAccountButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMediaQuery } from "react-responsive";
import querySizes from "../../../styling/breakpoints.json"

import { PageLoadingSpinner } from "../../generic/loading/Spinners";
import ProfilePicEditor from "./ProfilePicEditor";

const UserProfile = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return(<PageLoadingSpinner/>)
  }

  if (user === null) {
    return <Navigate to={SIGNIN_PAGE_PATH} />
  }

  return <DisplayInfo />
};

const DisplayInfo = (props) => {
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });
  return (
    <div className="max-w-2xl  ml-auto mr-auto">
      <div className="px-2 mr-auto ml-auto">
        <div className="text-left text-xl font-header font-bold ml-2 my-4">
          User Settings
        </div>
        <div className={`flex ${isDesktop ? "" : "flex-wrap" } justify-center`}>
          <ProfilePicEditor />
          <div className="w-full md:w-3/5 max-w-xl">
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
