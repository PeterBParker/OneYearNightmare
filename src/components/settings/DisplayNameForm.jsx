import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { auth } from "../..";
import {
  setAuthDisplayName,
  setCommentDisplayName,
  validateDisplayName,
} from "../users/utils";
import GenericSingleInputForm from "./GenericSingleInputForm";
import { BigSpinner } from "../generic/loading/Spinners";
import { USER_DISPLAY_NAME } from "../../api/RefKeys";
import { authUserOptions } from "../../api/ReactQueries";
import useCaptchaProtectedOperation from "../../hooks/useCaptchaProtectedOperation";

export default function DisplayNameForm(props) {
  const [user, loading] = useAuthState(auth);
  const [placeholder, setPlaceholder] = useState("");
  const { isPending, isError, data, error} = useQuery(authUserOptions(user))
  const { withCaptchaFallback } = useCaptchaProtectedOperation();

  useEffect(() => {
    if (!isPending && !isError) {
      setPlaceholder(data[USER_DISPLAY_NAME])
    }
  }, [isError, isPending, data])

  if (isPending) {
    return <BigSpinner/>
  }

  if (isError) {
    console.log("encountered error in getting the user data", error)
    return <BigSpinner/>
  }

  const changeDisplayName = withCaptchaFallback(async (newName) => {
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
  });

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
