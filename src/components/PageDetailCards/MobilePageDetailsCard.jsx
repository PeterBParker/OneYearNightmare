import Title from "../generic/Title";
import BodyText from "../generic/BodyText";
import JointSignature from "../generic/JointSignature";

export default function MobilePageDetailsCard(props) {
  function convertDateForIos(date) {
    var arr = date.split(/[- :]/);
    date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    return date;
  }

  let d = convertDateForIos(props.date);

  return (
    <div className="w-full border-t border-b border-mocha-dark bg-white">
      <div className="title w-full inline-block bg-eggshell py-6 px-6">
        <div className="text-left">
          <Title text={props.title} />
        </div>
      </div>
      <div className="message text-base w-full inline-block my-5 px-6">
        <div className="text-left">
          <BodyText text={props.page.message} />
        </div>
      </div>
      <div className="signatureAndTime inline-block w-full px-6 pb-6">
        <div className="sig float-left">
          <JointSignature userId={props.page.user} />
        </div>
        <div className="date float-right leading-8">
          <div className="font-body font-regular text-base text-gray-light leading-8">
            {String(d.getMonth() + 1) +
              "." +
              String(d.getDate()) +
              "." +
              String(d.getFullYear())}
          </div>
        </div>
      </div>
    </div>
  );
}
