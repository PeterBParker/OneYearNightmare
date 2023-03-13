import loadable from "@loadable/component";
import DesktopNotifySignUpBanner from "./DesktopNotifySignUpBanner";

const PageDetailsCard = loadable(() => import("../PageDetailsCard"));
const Comments = loadable(() => import("../../comments/Comments"));

export default function DesktopReadPageCards(props) {
  return (
    <>
      <DesktopNotifySignUpBanner />
      <div className="desktopReadPageCardsWrapper mx-8">
        <div className="desktopReadPageCardsDetails bg-white">
          <PageDetailsCard page={props.page} chapter={props.chapter} />
        </div>
        <div className="desktopReadPageCardsSupport bg-white ">
          <Comments slug={props.page.uuid} page={props.page} />
        </div>
      </div>
    </>
  );
}
