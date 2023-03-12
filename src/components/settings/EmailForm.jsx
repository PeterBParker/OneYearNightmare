import { useState } from "react";
import { setEmail } from "../users/utils";
import GenericSingleInputForm from "./GenericSingleInputForm";

export default function EmailForm() {
  const [placeholder, setPlaceholder] = useState("");

  const onSubmit = async (email) => {
    try {
      var success = await setEmail(email);
    } catch (error) {
      throw new Error(error.message);
    }

    if (success) {
      if (email != null) {
        setPlaceholder(email);
      } else {
        setPlaceholder("Please set an email.");
      }
    } else {
      throw new Error("Oops! Email updated failed.");
    }
  };

  return (
    <GenericSingleInputForm
      onSubmitAction={onSubmit}
      inputId="emailInput"
      inputName="email-input"
      maxLength={30}
      placeholder={placeholder}
      inputTitle="Login Email"
      confirmText="Save"
      confirmClasses="bg-green-confirm"
    />
  );
}
