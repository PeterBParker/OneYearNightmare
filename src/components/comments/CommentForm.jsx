import PropTypes from "prop-types";
import { useEffect, useState } from "react";

/**
 * Provides a form for a user to submit a comment
 */
export default function CommentForm(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitId = "comment-submit-btn";

  useEffect(() => {
    if (isErrored) {
      let submitButton = document.getElementById(submitId);
      submitButton.classList.add("bg-red-bad");
      submitButton.classList.add("text-eggshell");
      submitButton.classList.remove("bg-cream-dark");
    } else {
      let submitButton = document.getElementById(submitId);
      submitButton.classList.add("bg-cream-dark");
      submitButton.classList.remove("bg-red-bad");
      submitButton.classList.remove("text-eggshell");
    }
  });

  const handleSubmit = async (e) => {
    let thisButton = document.getElementById(submitId);
    e.preventDefault();
    thisButton.disabled = true;
    thisButton.classList.add("disabled");
    setIsDisabled(true);
    await props.onSubmitAction(e).catch((e) => {
      // show error state
      setIsErrored(true);
      setErrorMessage(e.toString());
      thisButton.disabled = false;
      setIsDisabled(false);
      thisButton.classList.remove("disabled");
    });
  };

  return (
    <div className="comment-input-box">
      <form onSubmit={handleSubmit}>
        <div
          className={`flex comment-input-elements mt-2 w-full ${
            isErrored ? "comment-input-error" : ""
          }`}
        >
          <div className="basis-3/4 w-full">
            <textarea
              id="comment"
              className={"comment-content-input mr-2"}
              onChange={(e) => {
                if (isErrored) {
                  setIsErrored(false);
                  setErrorMessage(null);
                }
                props.setContent(e.target.value);
              }}
              value={props.content}
              name="comment-content-input"
              required="required"
              maxLength={350}
            />
          </div>
          <button
            type="submit"
            id={submitId}
            style={{ width: 91, height: 88, wordBreak: "keep-all" }}
            className={`text-center basis-1/4 font-medium text-lg bg-cream-dark transition-all ${
              isDisabled || isErrored
                ? "cursor-default"
                : "hover:text-white hover:bg-green-confirm"
            }`}
          >
            {isDisabled ? (
              <div className="loader" style={{ width: 28, height: 28 }}></div>
            ) : isErrored ? (
              <div style={{ fontSize: "1.5rem" }}>⨉</div>
            ) : (
              <i
                style={{ fontSize: "1.7rem" }}
                className="fa-regular fa-circle-check"
              ></i>
            )}
          </button>
        </div>
      </form>
      {errorMessage ? (
        <div
          id="submitCommentErrorMessage"
          className="text-red-bad text-left italic"
        >
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
}

CommentForm.propTypes = {
  slug: PropTypes.string.isRequired,
  parentId: PropTypes.string,
};
