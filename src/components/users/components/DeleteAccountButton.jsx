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
    <div className="width-md">
      Are you absolutely sure you want to delete your account? This will remove
      all your comments.
    </div>
  );

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
    <div className="text-left text-xl font-header font-bold my-4">
      Delete Account?
    </div>
  );
  let modalFooter = (
    <div className="flex justify-between">
      <button
        className="rounded bg-red-bad btn text-center px-4 py-2 basis-1/4 font-medium text-lg"
        onClick={async () => {
          await deleteAccount();
        }}
      >
        Delete Me
      </button>
      <button
        className="rounded bg-grey-light btn text-center px-4 py-2 basis-1/4 font-medium text-white text-lg"
        onClick={() => setShowModal(false)}
      >
        Cancel
      </button>
    </div>
  );
  return (
    <div>
      <button
        className="rounded bg-red-bad btn text-center px-4 py-2 basis-1/4 font-medium text-lg"
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
      />
    </div>
  );
}
