import React, { useState } from "react";
import SignOutButton from "./SignOutButton";
import { auth } from "../../..";
import DisplayNameForm from "../../settings/DisplayNameForm";
import EmailForm from "../../settings/EmailForm";
import DeleteAccountButton from "./DeleteAccountButton";
import ProfilePicture from "./ProfilePicture";
import { getAvatarUrl } from "../avatarHelpers";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { storeUserAvatar } from "../avatarHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

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
      <DisplayNameForm onSuccessAction={() => props.setNotInitialized(false)} />
      <SignOutButton />
    </div>
  );
};

const DisplayInfo = () => {
  const [user, loading, auth_error] = useAuthState(auth);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("");
  const [fetchedAvatar, setFetchedAvatar] = useState(null);
  const [avatarSaved, setAvatarSaved] = useState(true);

  const changeAvatar = () => {
    let newSeed = uuidv4();
    setAvatarSeed(newSeed);
    setAvatarUrl(`https://api.dicebear.com/8.x/lorelei/svg?seed=${newSeed}`);
  };

  return (
    <div className="max-w-2xl ml-auto mr-auto">
      <div className="px-2 mr-auto ml-auto">
        <div className="text-left text-xl font-header font-bold ml-2 my-4">
          User Settings
        </div>
        <div className="flex flex-wrap justify-center md:justify-between">
          <div className="flex flex-wrap flex-col">
            <ProfilePicture
              width="200"
              height="200"
              avatarUrl={avatarUrl}
              fetchedAvatar={fetchedAvatar}
            />
            <div className="flex flex-wrap flex-row mt-4 mr-8 justify-evenly">
              <div
                className="btn btn-std-hover bg-white px-4 py-2 avatarModBtn"
                onClick={changeAvatar}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </div>
              <div
                className="btn btn-std-hover bg-green-confirm px-4 py-2 font-medium avatarModBtn"
                onClick={async () => {
                  setAvatarSaved(false);
                  await storeUserAvatar(user.uid, avatarSeed);
                  setAvatarSaved(true);
                }}
              >
                {avatarSaved ? (
                  "Save"
                ) : (
                  <div
                    className="loader"
                    style={{ width: 28, height: 28 }}
                  ></div>
                )}
              </div>
            </div>
          </div>
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
