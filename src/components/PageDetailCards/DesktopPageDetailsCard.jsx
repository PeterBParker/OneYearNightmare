import Title from "../generic/Title";
import BodyText from "../generic/BodyText";
import JointSignature from "../generic/JointSignature";

export default function DesktopPageDetailsCard(props) {
  return (
    <div className="desktopPageDetailsContainer flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="desktopPageDetailsTitle grow-0">
          <div className="text-left py-4 px-8">
            <Title text={props.title} />
          </div>
        </div>
        <div className="desktopPageDetailsMessage px-8 pb-6 grow-1">
          <div className="text-left text-lg">
            <BodyText text={props.message} />
          </div>
        </div>
      </div>

      <div className="desktopPageDetailsSigAndTime px-8 py-4 border-t-2 border-mocha-dark grow-0 w-full">
        <div className="desktopPageDetailsSignature">
          <JointSignature user={props.user} />
        </div>
        <div className="desktopPageDetailsTime self-center">
          <div className="date float-right leading-8 self-center">
            <div className="font-body font-regular text-xl text-gray-light leading-8">
              {String(props.date.getMonth() + 1) +
                "." +
                String(props.date.getDate()) +
                "." +
                String(props.date.getFullYear())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
