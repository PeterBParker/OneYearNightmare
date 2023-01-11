import { useState } from "react";
import { getEmail, setEmail } from "../users/utils";
import GenericSingleInputForm from "./GenericSingleInputForm";

export default function EmailForm() {
  const [placeholder, setPlaceholder] = useState("");

  const placeholderUpdate = async (user) => {
    // get Email
    let email = await getEmail();
    if (email != null) {
      setPlaceholder(email);
    } else {
      setPlaceholder("Please set an email.");
    }
  };

  const onSubmit = async (email) => {
    let success = await setEmail(email);
    if (success) {
      alert("Email updated!");
    } else {
      throw new Error("Oops! Email updated failed.");
    }
  };

  return (
    <GenericSingleInputForm
      placeholderUpdate={placeholderUpdate}
      onSubmitAction={onSubmit}
      inputId="emailInput"
      inputName="email-input"
      maxLength={30}
      placeholder={placeholder}
      inputTitle="Login Email"
    />
  );
}
