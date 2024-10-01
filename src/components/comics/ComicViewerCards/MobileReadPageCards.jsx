import PageDetailsCard from "../PageDetailsCard";
import Comments from "../../comments/Comments";
import NotifySignUpBanner from "./NotifySignUpBanner";
import { useMediaQuery } from "react-responsive";
import querySizes from "../../.././styling/breakpoints.json";
import { useParams } from "react-router-dom";
import { PARAM_PAGE_UUID } from "../../../api/RefKeys";

export default function MobileReadPageCards() {
  const isDesktopOrTablet = useMediaQuery({ query: querySizes["md"] });
  return [
    <NotifySignUpBanner
      isDesktop={isDesktopOrTablet}
      key="mobileEmailNotifySignUpBanner"
    />,
    <PageDetailsCard key="mobileReadPageDetailsCard" />,
    <Comments key="mobileCommentCard" />,
  ];
}
