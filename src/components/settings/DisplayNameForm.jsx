import { useState } from "react";
import { getDisplayName } from "../users/utils";
import { setAuthDisplayName, setCommentDisplayName } from "../users/utils";
import GenericSingleInputForm from "./GenericSingleInputForm";

export default function DisplayNameForm() {
  const [placeholder, setPlaceholder] = useState("");

  const placeholderUpdate = (user) => {
    getDisplayName(user.uid).then((display_name) => {
      setPlaceholder(display_name);
    });
  };

  const onSubmit = async (formName) => {
    const auth_success = await setAuthDisplayName(formName);
    const comment_success = await setCommentDisplayName(formName);
    if (auth_success && comment_success) {
      alert("Updated Display Name!");
    } else {
      alert(
        "Oops! There was an error in changing your display name. Please try again later."
      );
      console.log(
        "Error Updating Display Name:\n\t Location A Success: " +
          auth_success +
          "\n\t Location B Success: " +
          comment_success
      );
    }
  };
  return (
    <GenericSingleInputForm
      placeholderUpdate={placeholderUpdate}
      onSubmitAction={onSubmit}
      inputId="displayNameInput"
      inputName="display-name-input"
      maxLength={20}
      placeholder={placeholder}
      inputTitle="Display Name"
    />
  );
}
