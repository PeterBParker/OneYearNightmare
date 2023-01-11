import { auth } from "../../..";
import { signOut } from "firebase/auth";

export default function SignOutButton() {
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
}
