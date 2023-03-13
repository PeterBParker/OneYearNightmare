import Modal from "../generic/Modal";
import { useState, useEffect } from "react";
import GenericSingleInputForm from "../settings/GenericSingleInputForm";
import { functions } from "../..";
import { httpsCallable } from "@firebase/functions";

export default function EmailSignUpModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const addGuestToEmailList = httpsCallable(functions, "addGuestToEmailList");

  async function callAddGuestToEmailList(input) {
    try {
      var result = await addGuestToEmailList({ text: input });
    } catch (error) {
      throw new Error(error.message);
    }

    if (result.data?.status === true) {
      setSubscribed(true);
    }
  }

  const [callToAction, setCallToAction] = useState(
    <>
      <div className="text-left px-2 leading-5 font-body">
        <p>
          We add new pages once a week, and you'll be the first to know when!
        </p>
      </div>
      <GenericSingleInputForm
        placeholder=""
        onSubmitAction={callAddGuestToEmailList}
        inputId="modalEmailInputField"
        inputName="Email"
        maxLength={76}
        inputTitle="Email"
        confirmText="I'm in!"
        confirmClasses="w-full mt-4 bg-grey-dark text-white"
        inputClasses="rounded-lg border-2 border-slate-900 border-solid pl-4"
      />
    </>
  );

  useEffect(async () => {
    if (subscribed) {
      setCallToAction(
        <div className="mb-4 text-lg text-left mx-2">
          <div className="checkmark-wrapper py-1">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
          Nice! Next time we post, we'll send a heads-up to your inbox. 👍
          <i className="fa-solid fa-mailbox"></i>
        </div>
      );
      // Sleep for five seconds
      //   await new Promise((r) => setTimeout(r, 5000));
      //   setShowModal(false);
    }
  }, [subscribed]);

  const modalTitle = (
    <div className="emailHeroImage w-full">
      <button
        className="float-right px-4 pt-2  hover:text-red-bad"
        onClick={() => setShowModal(false)}
      >
        <i className="fa-solid fa-xmark fa-2x close-btn transition-all"></i>
      </button>
    </div>
  );
  const modalBody = (
    <div className="flex flex-col w-full pl-4 pr-4">
      <p className="font-header text-left font-semibold text-2xl m-2">
        Wanna stay updated?
      </p>
      {callToAction}
    </div>
  );
  const modalFooter = (
    <p className="font-body text-sm">
      P.S. We don't sell any of your data, and it's easy to unsubscribe.
    </p>
  );

  return [
    <Modal
      onClose={() => setShowModal(false)}
      title={modalTitle}
      body={modalBody}
      footer={modalFooter}
      show={showModal}
      key="comicViewerPageEmailSignUpModal"
      footerClasses="ml-6 mr-6 pb-4 text-left"
      contentClasses="emailModalContent transition-all"
    />,
    <button
      key="comicViewerPageEmailSignUpButton"
      onClick={() => setShowModal(true)}
      className="transition duration-500 ease-in-out bg-cream-dark hover-bump-center rounded text-2xl font-medium px-4 py-2 ml-4 text-grey-dark font-body"
    >
      Email <i className="fa-solid fa-envelope"></i>
    </button>,
  ];
}
