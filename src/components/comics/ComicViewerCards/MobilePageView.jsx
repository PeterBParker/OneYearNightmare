import GracefulImage from "../GracefulImage";
import NavBar from "../navigation/NavBar";

export default function MobilePageView(props) {
  return (
    <div className={"mobileComicPageContainer bg-cream-dark"}>
      <GracefulImage
        src={props.pageImageUrl}
        className="ml-auto mr-auto"
        reference={props.topOfPageRef}
        keyVal="mobileComicPageImage"
      />
      <NavBar
        pageId={props.pageId}
        isMobile={true}
        clickEffects={props.clickEffects}
      />
    </div>
  );
}
