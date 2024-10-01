import GracefulImage from "../GracefulImage";
import NavBar from "../navigation/NavBar";
import MobileReadPageCards from "./MobileReadPageCards";

export default function MobilePageView(props) {
  return (
    <>
      <div>
        <GracefulImage
          className="ml-auto mr-auto"
          reference={props.topOfPageRef}
          keyVal="mobileComicPageImage"
        />
        <NavBar isMobile={true} clickEffects={props.clickEffects} />
      </div>
      <MobileReadPageCards />
    </>
  );
}
