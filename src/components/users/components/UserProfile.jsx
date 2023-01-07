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
  const [name, setName] = useState("");

  const changeDisplayName = async (new_name) => {
    // First validate the display name doesn't already exist
    let is_valid = await validateDisplayName(new_name);
    if (is_valid == false) {
      throw new Error("Display name already exists. 😭");
    }
    // Add it if not
    let userDoc = {
      display_name: new_name,
      last_updated: Timestamp.fromDate(new Date()),
    };
    await setDoc(doc(collection(db, "users"), auth.currentUser.uid), userDoc);
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(
      () => {
        setName("");
        props.setNotInitialized(false);
      },
      function (error) {
        console.log("An error occured while updating profile:", error);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emsgBox = document.getElementById("dNameEmsg");
    let field = document.getElementById("dName");
    try {
      field.classList.remove("input-error");
      emsgBox.innerHTML = "";
      await changeDisplayName(name);
    } catch (error) {
      field.classList.add("input-error");
      emsgBox.innerHTML = error;
    }
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
          required
          pattern="\S(.*\S)?"
          onChange={(e) => setName(e.target.value)}
        />
        <div id="dNameEmsg" className="emsg"></div>
        <button type="submit" className="btn text-center px-4 py-2">
          Save
        </button>
      </form>
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
        <div className="text-left text-lg font-bold ml-2 my-4">
          User Settings
        </div>
        <div>Profile Picture Placeholder</div>
        <DisplayNameForm />
        <EmailForm />
        <div className="flex justify-between my-12">
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
