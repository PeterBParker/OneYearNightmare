import { useParams } from "react-router-dom/dist";
import { PARAM_PAGE_UUID } from "../../../api/RefKeys";

export default function BookmarkButton(props) {
  const params = useParams();
  return (
    <div
      className={`bookmarkBtnDims hover-wiggle cursor-pointer justify-self-center ${
        props.isMobile ? null : "mb-4"
      } self-center bg-white p-4 m-2 rounded-full drop-shadow-lg`}
      onClick={() => props.setBookmark(params[PARAM_PAGE_UUID].toString())}
    >
      <img
        src={props.bookmarkIcon}
        width={40}
        alt="bookmark button"
        className="ml-auto mr-auto"
      />
    </div>
  );
}
