import { useState } from "react";
import GenericSingleInputForm from "./GenericSingleInputForm";

export default function EmailForm() {
  const [placeholder, setPlaceholder] = useState("");

  const placeholderUpdate = (user) => {
    // get Email
    setPlaceholder("harrihaven2@gmail.com");
  };

  const onSubmit = async (email) => {};

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
