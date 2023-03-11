import NavBar from "../navigation/NavBar";
import GracefulImage from "../GracefulImage";

export default function DesktopPageView(props) {
  return (
    <div className={"desktopComicPageContainer"}>
      <GracefulImage
        src={props.pageImageUrl}
        reference={props.topOfPageRef}
        keyVal="desktopComicPageImage"
      />
      <div className="comicViewerVertShare ml-4 flex flex-col">
        <NavBar
          pageId={props.pageId}
          clickEffects={props.clickEffects}
          isMobile={false}
        />
      </div>
    </div>
  );
}
