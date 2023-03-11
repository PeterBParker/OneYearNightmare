import { auth } from "../../..";
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function SignOutButton() {
  const buttonId = "user-settings-sign-out-btn";
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <button
      id={buttonId}
      style={{ width: 104, height: 44 }}
      className="rounded bg-grey-light hover-bump-center text-eggshell btn text-center px-4 py-2 basis-1/4 font-medium text-lg"
      onClick={async () => {
        let thisButton = document.getElementById(buttonId);
        thisButton.disabled = true;
        setIsDisabled(true);
        signOut(auth).then(() => {
          setIsDisabled(false);
        });
        window.location.reload();
      }}
    >
      {isDisabled ? (
        <div className="loader" style={{ width: 28, height: 28 }}></div>
      ) : (
        "Sign Out"
      )}
    </button>
  );
}
