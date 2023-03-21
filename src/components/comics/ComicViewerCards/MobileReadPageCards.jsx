import PageDetailsCard from "../PageDetailsCard";
import Comments from "../../comments/Comments";
import NotifySignUpBanner from "./NotifySignUpBanner";
import { useMediaQuery } from "react-responsive";
import querySizes from "../../.././styling/breakpoints.json";

export default function MobileReadPageCards(props) {
  const isDesktop = useMediaQuery({ query: querySizes["md"] });
  return [
    <NotifySignUpBanner isDesktop={isDesktop} />,
    <PageDetailsCard
      page={props.page}
      chapter={props.chapter}
      key="mobileReadPageDetailsCard"
    />,
    <Comments
      slug={props.page.uuid}
      key="mobileCommentCard"
      page={props.page}
    />,
  ];
}
