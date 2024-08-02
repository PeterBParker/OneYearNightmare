import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import moIcon from "../../assets/Phase4-Assets1/2x/profile-M-50px.png";
import { pageDataQuery } from "../../routes/ComicViewer";
import querySizes from "../../styling/breakpoints.json";
import { SmallSpinner } from "./loading/Spinners";
import {
  USER_DISPLAY_NAME,
  AUTHOR_KEY,
  PARAM_PAGE_UUID,
  USER_URL,
} from "../../api/RefKeys";

export default function JointSignature(props) {
  const params = useParams();
  const { data, isLoading } = useQuery(pageDataQuery(params[PARAM_PAGE_UUID]));
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });

  if (isLoading) {
    return <SmallSpinner />;
  }

  let avatarURL = moIcon;
  let authorName = "Nate and Mo";
  if (
    AUTHOR_KEY in data &&
    USER_URL in data[AUTHOR_KEY] &&
    USER_DISPLAY_NAME in data[AUTHOR_KEY]
  ) {
    avatarURL = data[AUTHOR_KEY][USER_DISPLAY_NAME];
    authorName = data[AUTHOR_KEY][USER_DISPLAY_NAME];
  }
  return (
    <div className="inline-block flex flex-row">
      <div className="inline float-left self-center">
        <img src={avatarURL} width={`${isDesktop ? "50px" : "33px"}`} alt="" />
      </div>
      <div
        className={`sigText font-header font-medium ${
          isDesktop ? "text-2xl" : "text-xl"
        } text-left inline float-left text-gray-light mx-3 leading-8 self-center`}
      >
        <p>{authorName}</p>
      </div>
    </div>
  );
}
