import { useState } from "react";
import { auth } from "../..";
import { storeUserAvatar } from "../users/avatarHelpers";
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
    if (props.onChangeAction !== undefined) {
      props.onChangeAction();
    }
    // First validate the display name doesn't already exist
    await validateDisplayName(newName);
    // Add it if not
    const comment_success = await setCommentDisplayName(newName);
    const auth_success = await setAuthDisplayName(newName);
    //Update user avatar
    if (auth.currentUser != null) {
      //check if avatar already exists
      await storeUserAvatar(auth.currentUser.uid, newName);
    }
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
      placeholderUpdate={placeholderUpdate}
      onSubmitAction={changeDisplayName}
      inputId="displayNameInput"
      inputName="display-name-input"
      maxLength={20}
      placeholder={placeholder}
      inputTitle="Display Name"
      helperText="Valid names consist only of a-Z, 0-9, -, and _"
    />
  );
}
