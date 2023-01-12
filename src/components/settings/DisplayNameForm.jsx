import { useState } from "react";
import { getDisplayName } from "../users/utils";
import {
  setAuthDisplayName,
  setCommentDisplayName,
  validateDisplayName,
} from "../users/utils";
import GenericSingleInputForm from "./GenericSingleInputForm";

export default function DisplayNameForm(props) {
  const [placeholder, setPlaceholder] = useState("");

  const placeholderUpdate = (user) => {
    getDisplayName(user.uid).then((display_name) => {
      setPlaceholder(display_name);
    });
  };

  const changeDisplayName = async (newName) => {
    // First validate the display name doesn't already exist
    await validateDisplayName(newName);
    // Add it if not
    const comment_success = await setCommentDisplayName(newName);
    const auth_success = await setAuthDisplayName(newName);
    if (auth_success && comment_success) {
      if (props.onSubmitAction != undefined) {
        props.onSubmitAction();
      }
    } else {
      throw new Error("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <GenericSingleInputForm
      placeholderUpdate={placeholderUpdate}
      onSubmitAction={changeDisplayName}
      inputId="displayNameInput"
      inputName="display-name-input"
      maxLength={20}
      placeholder={placeholder}
      inputTitle="Display Name"
    />
  );
}
