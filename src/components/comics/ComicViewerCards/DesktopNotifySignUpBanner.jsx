import EmailSignUpModal from "../../email/EmailSignUpModal";
export default function DesktopNotifySignUpBanner() {
  return (
    <div className="notification-signup-banner ml-auto mr-auto mb-4 justify-center py-6 items-center">
      <div className="ml-8 text-left ">
        <div className="font-bold text-2xl text-grey-dark font-header">
          {"Get Notified of New Pages!"}
        </div>
      </div>
      <div className="flex justify-end text-grey-dark font-body">
        <a
          href="https://discord.gg/47DQVUnbD6"
          className="bg-cream-dark hover-bump-center rounded text-2xl font-medium px-4 py-2 text-grey-dark"
        >
          Discord <i className="fa-brands fa-discord"></i>{" "}
        </a>
        <EmailSignUpModal />
      </div>
    </div>
  );
}
