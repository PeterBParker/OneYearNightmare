import GracefulImage from "../GracefulImage";
import NavBar from "../navigation/NavBar";
import MobileReadPageCards from "./MobileReadPageCards";

export default function MobilePageView(props) {
  return (
    <>
      <div>
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
      <MobileReadPageCards
        page={props.page}
        chapter={props.chapter}
        page_uuid={props.page.uuid}
      />
    </>
  );
}
