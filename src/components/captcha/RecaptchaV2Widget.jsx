import { useEffect, useRef, useState, useId } from "react";

// If no API key is found in the env, use the default key for testing
const RECAPTCHA_V2_SITE_KEY = process.env.REACT_APP_RECAPTCHA_V2_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

export default function RecaptchaV2Widget({ onSuccess, onExpired, onError }) {
  const containerId = useId().replace(/:/g, "_");
  const widgetIdRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Load the script once
  useEffect(() => {
    if (document.querySelector('script[src*="recaptcha/api.js"]')) {
      // Script already loaded
      if (window.grecaptcha?.render) {
        setIsReady(true);
      } else {
        window.grecaptcha?.ready?.(() => setIsReady(true));
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha?.ready?.(() => setIsReady(true));
    };

    script.onerror = () => {
      onError?.("Failed to load reCAPTCHA. Please check your connection.");
    };

    document.head.appendChild(script);
  }, [onError]);

  // Render the widget when ready
  useEffect(() => {
    if (!isReady) return;

    const container = document.getElementById(containerId);
    if (!container || !window.grecaptcha?.render) return;

    // Check if already rendered (container has children)
    if (container.hasChildNodes()) return;

    // Double-check we haven't rendered
    if (widgetIdRef.current !== null) return;

    try {
      widgetIdRef.current = window.grecaptcha.render(containerId, {
        sitekey: RECAPTCHA_V2_SITE_KEY,
        callback: (token) => onSuccess?.(token),
        "expired-callback": () => onExpired?.(),
        "error-callback": () => onError?.("reCAPTCHA encountered an error. Please try again."),
      });
    } catch (err) {
      // Silently handle if already rendered
      if (!err.message?.includes("already been rendered")) {
        console.error("Error rendering reCAPTCHA:", err);
      }
    }

    return () => {
      // Don't call grecaptcha.reset() - it causes timeout errors when
      // React StrictMode unmounts. The DOM removal handles cleanup.
      widgetIdRef.current = null;
    };
  }, [isReady, containerId, onSuccess, onExpired, onError]);

  return (
    <div
      id={containerId}
      className="flex justify-center my-4"
    />
  );
}
