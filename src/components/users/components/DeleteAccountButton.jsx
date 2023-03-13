import { useState } from "react";
import Modal from "../../generic/Modal";
import { NO_USER_ID } from "../../Main";
import { storeUserAvatar } from "../avatarHelpers";
import {
  deleteComments,
  deleteUserCommentId,
  deleteUserWrapper,
} from "../utils";

export default function DeleteAccountButton() {
  const [showModal, setShowModal] = useState(false);
  const [modalBodyText, setModalBodyText] = useState(
    <div className="width-md pl-4 pr-4">
      Are you absolutely sure you want to delete your account? This will remove
      all your comments.
    </div>
  );
  const deleteBtnId = "delete-me-confirmation-btn";
  const [isDisabled, setIsDisabled] = useState(false);

  const deleteAccount = async () => {
    try {
      await deleteComments();
      await deleteUserCommentId();
      await deleteUserWrapper();
      await storeUserAvatar(NO_USER_ID, "");
    } catch (error) {
      console.log(error);
    }
  };

  let modalTitle = (
    <div className="text-left text-xl font-header font-bold my-4 pt-4 pl-4 pr-4">
      Delete Account?
    </div>
  );
  let modalFooter = (
    <div className="flex justify-between pb-4 pl-4 pr-4">
      <button
        style={{ width: 116, height: 44 }}
        id={deleteBtnId}
        className="rounded bg-red-bad btn btn-std-hover text-center px-4 py-2 basis-1/4 font-medium text-lg"
        onClick={async () => {
          let deleteBtn = document.getElementById(deleteBtnId);
          deleteBtn.disabled = true;
          setIsDisabled(true);
          await deleteAccount();
          // We don't update the state because React will sign the user out in deleteAccount()
          // deleteBtn.disabled = false;
          // setIsDisabled(false);
        }}
      >
        {isDisabled ? (
          <div className="loader" style={{ width: 28, height: 28 }}></div>
        ) : (
          "Delete Me"
        )}
      </button>
      <button
        className="rounded bg-grey-light btn btn-std-hover text-center px-4 py-2 basis-1/4 font-medium text-white text-lg"
        onClick={() => setShowModal(false)}
      >
        Cancel
      </button>
    </div>
  );
  return (
    <div>
      <button
        className="rounded btn-std-hover bg-red-bad btn text-center px-4 py-2 basis-1/4 font-medium text-lg"
        onClick={() => {
          setShowModal(true);
        }}
        key="deleteAccountButton"
      >
        Delete Account
      </button>

      <Modal
        show={showModal}
        title={modalTitle}
        body={modalBodyText}
        footer={modalFooter}
        onClose={() => setShowModal(false)}
        bodyClasses="mb-6"
      />
    </div>
  );
}
