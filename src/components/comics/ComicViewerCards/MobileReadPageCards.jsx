import PageDetailsCard from "../PageDetailsCard";
import Comments from "../../comments/Comments";
import MobileSupportUsCard from "../../generic/SupportUs/MobileSupportUsCard";
import SupportUsCard from "../../generic/SupportUs/SupportUsCard";

export default function MobileReadPageCards(props) {
  return [
    <PageDetailsCard
      page={props.page}
      chapter={props.chapter}
      key="mobileReadPageDetailsCard"
    />,
    <Comments
      slug={props.page.uuid}
      comments={props.comments}
      key="mobileCommentCard"
    />,
  ];
}
