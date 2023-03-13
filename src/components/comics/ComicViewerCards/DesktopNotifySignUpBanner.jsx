import EmailSignUpModal from "../../email/EmailSignUpModal";
export default function DesktopNotifySignUpBanner() {
  return (
    <div className="notification-signup-banner ml-auto mr-auto mb-4 justify-between py-6 items-center">
      <div className="  ml-8 text-left ">
        <div className="font-bold text-2xl">{"Get Notified of New Pages!"}</div>
      </div>
      <a
        href="https://discord.gg/47DQVUnbD6"
        className="bg-cream-dark hover-bump-center rounded text-2xl font-medium px-4 py-2 mr-8"
      >
        Join Discord <i className="fa-solid fa-arrow-right"></i>
      </a>
      <EmailSignUpModal />
    </div>
  );
}
