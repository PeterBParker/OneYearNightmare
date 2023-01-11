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
   */
  const [formData, setFormName] = useState("");
  const [user, loading, auth_error] = useAuthState(auth);
  const eMsgId = props.inputId + "-error-message";
  useEffect(() => {
    props.placeholderUpdate(user);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let emsgBox = document.getElementById(eMsgId);
    let field = document.getElementById(props.inputId);
    field.classList.remove("input-error");
    emsgBox.innerHTML = "";
    try {
      await props.onSubmitAction(formData);
    } catch (error) {
      field.classList.add("input-error");
      emsgBox.innerHTML = error;
    }
  };

  if (user) {
    return (
      <div className="my-2 mx-2">
        <div className="text-left font-medium">{props.inputTitle}</div>
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
              className="w-full py-4 px-2"
            />
            <div
              id={eMsgId}
              className="emsg text-left text-red-bright italic"
            ></div>
          </div>
          <div className="flex justify-end ">
            <button
              type="submit"
              className="rounded submit-btn btn text-center px-4 py-2 basis-1/4 font-medium text-lg bg-green-confirm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return "User is not signed in.";
  }
}
