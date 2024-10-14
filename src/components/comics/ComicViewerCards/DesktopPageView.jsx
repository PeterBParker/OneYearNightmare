import NavBar from "../navigation/NavBar";
import loadable from "@loadable/component";
import GracefulImage from "../GracefulImage";

const DesktopReadPageCards = loadable(() => import("./DesktopReadPageCards"));

export default function DesktopPageView(props) {
  return (
    <div className={"desktopComicPageContainer"}>
      <GracefulImage
        reference={props.topOfPageRef}
        keyVal="desktopComicPageImage"
      />
      <div className="comicViewerVertShare ml-4 flex flex-col">
        <NavBar clickEffects={props.clickEffects} isMobile={false} />
      </div>
      <DesktopReadPageCards />
    </div>
  );
}
