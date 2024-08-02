import Title from "../generic/Title";
import BodyText from "../generic/BodyText";
import JointSignature from "../generic/JointSignature";

export default function MobilePageDetailsCard(props) {
  return (
    <div className="w-full border-t border-b border-mocha-dark bg-white">
      <div className="title w-full inline-block bg-eggshell py-6 px-6">
        <div className="text-left">
          <Title text={props.title} />
        </div>
      </div>
      <div className="message text-base w-full inline-block my-5 px-6">
        <div className="text-left">
          <BodyText text={props.message} />
        </div>
      </div>
      <div className="signatureAndTime inline-block w-full px-6 pb-6">
        <div className="sig float-left">
          <JointSignature user={props.user} avatarURL={props.avatarURL} />
        </div>
        <div className="date float-right leading-8">
          <div className="font-body font-regular text-base text-gray-light leading-8">
            {String(props.date.getMonth() + 1) +
              "." +
              String(props.date.getDate()) +
              "." +
              String(props.date.getFullYear())}
          </div>
        </div>
      </div>
    </div>
  );
}
