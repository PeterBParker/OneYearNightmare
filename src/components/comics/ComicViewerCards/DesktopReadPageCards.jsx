import loadable from "@loadable/component";
import NotifySignUpBanner from "./NotifySignUpBanner";

const PageDetailsCard = loadable(() => import("../PageDetailsCard"));
const Comments = loadable(() => import("../../comments/Comments"));

export default function DesktopReadPageCards(props) {
  return (
    <>
      <NotifySignUpBanner isDesktop={true} />
      <div className="desktopReadPageCardsWrapper mx-8">
        <PageDetailsCard />
        <div className="desktopReadPageCardsSupport bg-white ">
          <Comments />
        </div>
      </div>
    </>
  );
}
