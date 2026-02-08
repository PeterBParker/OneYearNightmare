import { useState, useCallback } from "react";
import { httpsCallable } from "@firebase/functions";
import Modal from "../generic/Modal";
import RecaptchaV2Widget from "./RecaptchaV2Widget";
import { useCaptchaFallback } from "../../contexts/CaptchaFallbackContext";
import { functions } from "../..";

export default function CaptchaFallbackModal() {
  const {
    showCaptchaModal,
    error,
    onVerificationSuccess,
    onVerificationError,
    closeCaptchaModal,
  } = useCaptchaFallback();

  const [isVerifying, setIsVerifying] = useState(false);
  const [expired, setExpired] = useState(false);

  const verifyRecaptchaV2 = httpsCallable(functions, "verifyRecaptchaV2");

  const handleSuccess = useCallback(async (token) => {
    setIsVerifying(true);
    setExpired(false);

    try {
      const result = await verifyRecaptchaV2({ token });

      if (result.data?.success) {
        await onVerificationSuccess(result.data.expiresIn);
      } else {
        onVerificationError(result.data?.error || "Verification failed. Please try again.");
      }
    } catch (err) {
      onVerificationError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  }, [verifyRecaptchaV2, onVerificationSuccess, onVerificationError]);

  const handleExpired = useCallback(() => {
    setExpired(true);
    onVerificationError("Verification expired. Please complete the challenge again.");
  }, [onVerificationError]);

  const handleError = useCallback((errorMsg) => {
    onVerificationError(errorMsg);
  }, [onVerificationError]);

  const handleClose = useCallback(() => {
    setIsVerifying(false);
    setExpired(false);
    closeCaptchaModal();
  }, [closeCaptchaModal]);

  const modalTitle = (
    <div className="flex justify-between items-center px-4 pt-4">
      <h2 className="font-header font-semibold text-xl">Verification Required</h2>
      <button
        className="hover:text-red-bad transition-all"
        onClick={handleClose}
        disabled={isVerifying}
      >
        <i className="fa-solid fa-xmark fa-lg close-btn"></i>
      </button>
    </div>
  );

  const modalBody = (
    <div className="flex flex-col items-center px-4 py-4">
      <p className="font-body text-center mb-4">
        Please complete the verification below to continue.
      </p>

      {isVerifying ? (
        <div className="flex flex-col items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-grey-dark mb-4"></div>
          <p className="font-body text-sm text-gray-600">Verifying...</p>
        </div>
      ) : (
        <RecaptchaV2Widget
          onSuccess={handleSuccess}
          onExpired={handleExpired}
          onError={handleError}
        />
      )}

      {(error || expired) && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded text-red-700 text-sm">
          {error || "Verification expired. Please try again."}
        </div>
      )}
    </div>
  );

  const modalFooter = (
    <div className="px-4 pb-4">
      <p className="font-body text-xs text-gray-500 text-center">
        This helps us prevent automated abuse.
      </p>
    </div>
  );

  return (
    <Modal
      onClose={handleClose}
      title={modalTitle}
      body={modalBody}
      footer={modalFooter}
      show={showCaptchaModal}
      contentClasses="max-w-md mx-auto"
      titleClasses=""
      bodyClasses=""
      footerClasses=""
    />
  );
}
