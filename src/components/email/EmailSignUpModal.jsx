import Modal from "../generic/Modal";
import { useState } from "react";
import GenericSingleInputForm from "../settings/GenericSingleInputForm";
import { functions } from "../..";
import { httpsCallable } from "@firebase/functions";

export default function EmailSignUpModal(props) {
  const [showModal, setShowModal] = useState(false);

  const addGuestToEmailList = httpsCallable(functions, "addGuestToEmailList");

  async function callAddGuestToEmailList(input) {
    addGuestToEmailList({ text: input })
      .then((result) => {
        if (result.data?.status == true) {
          console.log("Success!");
        }
      })
      .catch((error) => {
        console.log(error.code);
      });
  }

  const modalTitle = <div className="emailHeroImage w-full" />;
  const modalBody = (
    <div className="flex flex-col w-full pl-4 pr-4">
      <p className="font-header text-left font-semibold text-2xl m-2">
        Wanna stay updated?
      </p>
      <GenericSingleInputForm
        placeholderUpdate={async (user) => {}}
        placeholder=""
        onSubmitAction={callAddGuestToEmailList}
        inputId="modalEmailInputField"
        inputName="Email"
        maxLength={76}
        inputTitle="Email"
        confirmText="Subscribe"
        confirmClasses="w-full mt-4 bg-grey-dark text-white"
        inputClasses="rounded-lg border-2 border-slate-900 border-solid pl-4"
      />
    </div>
  );
  const modalFooter = (
    <p className="font-body text-sm">
      P.S. We don't sell any of your data, and you can always unsubscribe.
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
      contentClasses="emailModalContent"
    />,
    <button
      key="comicViewerPageEmailSignUpButton"
      onClick={() => setShowModal(true)}
      className="transition duration-500 ease-in-out bg-cream-dark hover-bump-center rounded text-2xl font-medium px-4 py-2 mr-8"
    >
      Join Email <i className="fa-solid fa-arrow-right"></i>
    </button>,
  ];
}
