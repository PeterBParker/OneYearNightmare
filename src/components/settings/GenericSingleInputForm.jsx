import { useState, useEffect } from "react";
import { auth } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";

export default function GenericSingleInputForm(props) {
  /**
   * A class to abstract a single input field's functionality and styling
   *
   * Expects the props:
   * placholderUpdate: an async function that updates the field's placeholder text
   * placeholder: a value to use as the placeholder text
   * onSubmitAction: an async function that takes the field's input when the "Save" button is pressed
   * inputId: the html id to set for the input field
   * inputName: the html name to set for the input field
   * maxLength: the max length of characters to limit in the input field
   * inputTitle: The field's label
   * confirmClasses: string of classes for the confirm button
   * confirmText: string to display inside the confirm button
   */
  const [formData, setFormName] = useState("");
  const [user, loading, auth_error] = useAuthState(auth);
  const eMsgId = props.inputId + "-error-message";
  const submitBtnId = props.inputId + "-submit-btn";
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (user) {
      props.placeholderUpdate(user);
    }
  }, [user.displayName, user.email]);

  const submitBtnPending = (submitBtn) => {
    // Set loading icon in Save button and disable it until action is resolved
    submitBtn.disabled = true;
    setIsDisabled(true);
    submitBtn.classList.add("disabled");
  };
  const submitBtnFinished = (submitBtn) => {
    submitBtn.disabled = false;
    setIsDisabled(false);
    submitBtn.classList.remove("disabled");
  };
  const printError = (errorMsg) => {
    document.getElementById(props.inputId).classList.add("input-error");
    document.getElementById(eMsgId).innerHTML = errorMsg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.length > 0) {
      let submitBtn = document.getElementById(submitBtnId);
      submitBtnPending(submitBtn);
      let emsgBox = document.getElementById(eMsgId);
      let field = document.getElementById(props.inputId);
      field.classList.remove("input-error");
      emsgBox.innerHTML = "";
      try {
        await props.onSubmitAction(formData);
        setFormName("");
      } catch (error) {
        printError(error);
      }
      submitBtnFinished(submitBtn);
    }
  };

  if (user) {
    return (
      <div className="my-2 mx-2">
        <div className="text-left font-medium">{props.inputTitle}</div>
        <div className="italic text-left text-sm">
          {props.helperText ? props.helperText : ""}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <input
              type="text"
              id={props.inputId}
              onChange={(e) => setFormName(e.target.value)}
              value={formData}
              name={props.inputName}
              maxLength={props.maxLength}
              placeholder={props.placeholder}
              className={`w-full py-4 px-2 ${props.inputClasses}`}
            />
            <div
              id={eMsgId}
              className="emsg text-left text-red-bright italic"
            ></div>
          </div>
          <div className="flex justify-end w-full">
            <button
              type="submit"
              id={submitBtnId}
              className={`rounded hover-bump-center btn text-center px-4 py-2 my-2 basis-1/4 font-medium text-lg ${props.confirmClasses}`}
            >
              {isDisabled ? (
                <div className="loader" style={{ width: 28, height: 28 }}></div>
              ) : (
                props.confirmText
              )}
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return "User is not signed in.";
  }
}
