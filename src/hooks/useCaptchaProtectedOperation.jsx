import { useCallback } from "react";
import { useCaptchaFallback } from "../contexts/CaptchaFallbackContext";

// Error codes that indicate App Check / permission failures
const APP_CHECK_ERROR_CODES = [
  "permission-denied",
  "functions/permission-denied",
  "unauthenticated",
  "functions/unauthenticated",
];

// Check if an error is an App Check failure
function isAppCheckError(error) {
  if (!error) return false;

  const code = error.code || error.message || "";
  return APP_CHECK_ERROR_CODES.some(
    (appCheckCode) => code.includes(appCheckCode)
  );
}

export default function useCaptchaProtectedOperation() {
  const { triggerCaptcha, isVerificationValid } = useCaptchaFallback();

  // Wrap an async operation with captcha fallback
  const withCaptchaFallback = useCallback(
    (operation) => {
      return async (...args) => {
        // If already verified and valid, just run the operation
        if (isVerificationValid()) {
          return await operation(...args);
        }

        try {
          // Try the operation first
          return await operation(...args);
        } catch (error) {
          // Check if this is an App Check error
          if (isAppCheckError(error)) {
            // Trigger the captcha modal with the pending operation
            triggerCaptcha(operation, args);
            // Return a promise that never resolves - the modal will handle retry
            return new Promise(() => {});
          }
          // Re-throw non-App-Check errors
          throw error;
        }
      };
    },
    [triggerCaptcha, isVerificationValid]
  );

  return { withCaptchaFallback };
}
