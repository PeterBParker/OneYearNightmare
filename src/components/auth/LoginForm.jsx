import { sendSignInLinkToEmail } from "firebase/auth";
import { auth, DOMAIN, FINISH_SIGNIN_PAGE_PATH } from "../..";
import { useState } from "react";

export default function LoginForm() {
    const submitId = "loginSubmit";
    const [content, setContent] = useState("");
    const actionCodeSettings = {
        // URL you want to redirect back to.
        url: DOMAIN+FINISH_SIGNIN_PAGE_PATH,
        // This must be true.
        handleCodeInApp: true,
      };
    const handleSubmit = async (e) => {
        let thisButton = document.getElementById(submitId);
        e.preventDefault();
        thisButton.disabled = true;
        thisButton.classList.add("disabled");
        const email = content;
        console.log(email)
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage + " with code: " + errorCode)
            });
          thisButton.disabled = false;
          thisButton.classList.remove("disabled");
      };
    return(
        <div className="bg-mocha/50 border-2 border-eggshell rounded-lg max-w-2xl py-16 px-16">
            <div className="text-2xl font-semibold pb-8">Enter your email and we'll<br/> send you a login link</div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="emailInput" placeholder="Email" onChange={(e) => setContent(e.target.value)} className="rounded-lg text-lg py-3 px-3 w-full"></input>
                    <button id={submitId} type="submit" className="btn btn-std-hover btn my-4 py-2 w-full text-lg bg-cream-dark font-medium not-italic rounded">Next</button>
                </form>
                
            </div>

        </div>
    )
}