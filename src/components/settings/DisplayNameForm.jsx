import { useState, useEffect } from "react";
import { auth } from "../..";
import { getDisplayName } from "../users/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  setAuthDisplayName,
  setCommentDisplayName,
  validateDisplayName,
} from "../users/utils";
import GenericSingleInputForm from "./GenericSingleInputForm";

export default function DisplayNameForm(props) {
  const [user, loading, error] = useAuthState(auth);
  const [placeholder, setPlaceholder] = useState("");

  if (user) {
    getDisplayName(user.uid).then((displayName) => {
      setPlaceholder(displayName);
    });
  }

  const changeDisplayName = async (newName) => {
    if (props.onChangeAction !== undefined) {
      props.onChangeAction();
    }
    // First validate the display name doesn't already exist
    await validateDisplayName(newName);
    // Add it if not
    const comment_success = await setCommentDisplayName(newName);
    const auth_success = await setAuthDisplayName(newName);
    setPlaceholder(newName);

    if (auth_success && comment_success) {
      if (props.onSuccessAction !== undefined) {
        props.onSuccessAction();
      }
      if (props.asyncOnSuccessAction !== undefined) {
        await props.asyncOnSuccessAction();
      }
    } else {
      throw new Error("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <GenericSingleInputForm
      onSubmitAction={changeDisplayName}
      inputId="displayNameInput"
      inputName="display-name-input"
      maxLength={20}
      placeholder={placeholder}
      inputTitle="Display Name"
      inputClasses="rounded-lg border border-slate-900 border-solid"
      helperText="Valid names consist only of a-Z, 0-9, -, and _"
      confirmText="Save"
      confirmClasses="bg-green-confirm mt-4"
    />
  );
}
