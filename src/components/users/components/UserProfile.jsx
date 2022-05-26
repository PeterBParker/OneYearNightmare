import React, { useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../../..";

const UserProfile = () => {
  console.log(auth.currentUser.displayName);
  return auth.currentUser.displayName ? <DisplayInfo /> : <InitializeInfo />;
};

const InitializeInfo = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(
      () => {
        setName("");
      },
      function (error) {
        console.log("An error occured while updating profile:", error);
      }
    );
  };
  return (
    <div>
      <div className="cardHeader">Set Up Profile</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dName">Display Name:</label>
        <input
          type="text"
          id="dName"
          name="dName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn text-center px-4 py-2">
          Save
        </button>
      </form>
      <SignOutButton />
    </div>
  );
};

const DisplayInfo = () => {
  return (
    <div>
      <div className="cardHeader">User Profile</div>
      <div className="grid">
        <div>Profile Picture Placeholder</div>
        <div>Display Name: {auth.currentUser.displayName}</div>
        <div>Delete Account</div>
      </div>
      <SignOutButton />
    </div>
  );
};

const SignOutButton = () => {
  return (
    <button
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
