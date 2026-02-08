import { createContext, useContext, useState, useCallback, useRef } from "react";

const CaptchaFallbackContext = createContext(null);

// Session cache duration: 30 minutes
const VERIFICATION_DURATION_MS = 30 * 60 * 1000;

export function CaptchaFallbackProvider({ children }) {
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationExpiry, setVerificationExpiry] = useState(null);
  const [error, setError] = useState(null);

  // Store the pending operation to retry after verification
  const pendingOperationRef = useRef(null);

  // Check if current verification is still valid
  const isVerificationValid = useCallback(() => {
    if (!isVerified || !verificationExpiry) return false;
    return Date.now() < verificationExpiry;
  }, [isVerified, verificationExpiry]);

  // Trigger the captcha modal with a pending operation
  const triggerCaptcha = useCallback((operation, args = []) => {
    pendingOperationRef.current = { operation, args };
    setError(null);
    setShowCaptchaModal(true);
  }, []);

  // Called when v2 verification succeeds
  const onVerificationSuccess = useCallback(async (expiresIn = VERIFICATION_DURATION_MS) => {
    setIsVerified(true);
    setVerificationExpiry(Date.now() + expiresIn);
    setShowCaptchaModal(false);
    setError(null);

    // Retry the pending operation if one exists
    const pending = pendingOperationRef.current;
    if (pending) {
      pendingOperationRef.current = null;
      try {
        return await pending.operation(...pending.args);
      } catch (err) {
        // If the retry fails, don't show captcha again immediately
        throw err;
      }
    }
  }, []);

  // Called when verification fails
  const onVerificationError = useCallback((errorMessage) => {
    setError(errorMessage);
  }, []);

  // Close the modal without verifying
  const closeCaptchaModal = useCallback(() => {
    setShowCaptchaModal(false);
    pendingOperationRef.current = null;
    setError(null);
  }, []);

  // Reset verification state (e.g., on logout)
  const resetVerification = useCallback(() => {
    setIsVerified(false);
    setVerificationExpiry(null);
    pendingOperationRef.current = null;
  }, []);

  const value = {
    showCaptchaModal,
    isVerified,
    isVerificationValid,
    error,
    triggerCaptcha,
    onVerificationSuccess,
    onVerificationError,
    closeCaptchaModal,
    resetVerification,
  };

  return (
    <CaptchaFallbackContext.Provider value={value}>
      {children}
    </CaptchaFallbackContext.Provider>
  );
}

export function useCaptchaFallback() {
  const context = useContext(CaptchaFallbackContext);
  if (!context) {
    throw new Error("useCaptchaFallback must be used within a CaptchaFallbackProvider");
  }
  return context;
}
