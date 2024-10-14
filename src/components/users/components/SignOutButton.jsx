import { auth, SIGNIN_PAGE_PATH } from "../../..";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom/dist";

export default function SignOutButton() {
  const buttonId = "user-settings-sign-out-btn";
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate()

  return (
    <button
      id={buttonId}
      style={{width: 280}}
      className="rounded bg-grey-light btn-std-hover text-eggshell btn text-center px-4 py-2 basis-1/4 font-medium text-lg"
      onClick={async () => {
        let thisButton = document.getElementById(buttonId);
        thisButton.disabled = true;
        setIsDisabled(true);
        signOut(auth).then(() => {
          setIsDisabled(false);
        });
        navigate(SIGNIN_PAGE_PATH);
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
