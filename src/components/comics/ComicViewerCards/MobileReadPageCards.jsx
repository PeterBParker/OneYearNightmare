import PageDetailsCard from "../PageDetailsCard";
import Comments from "../../comments/Comments";
import NotifySignUpBanner from "./NotifySignUpBanner";

export default function MobileReadPageCards(props) {
  return [
    <NotifySignUpBanner isDesktop={false} />,
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
