import PageDetailsCard from "../PageDetailsCard";
import Comments from "../../comments/Comments";

export default function MobileReadPageCards(props) {
  return [
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
