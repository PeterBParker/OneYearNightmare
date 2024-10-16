import DesktopPageDetailsCard from "../PageDetailCards/DesktopPageDetailsCard";
import MobilePageDetailsCard from "../PageDetailCards/MobilePageDetailsCard";
import { useMediaQuery } from "react-responsive";
import querySizes from "../../styling/breakpoints.json";
import { useParams } from "react-router-dom/dist";
import { useQuery } from "@tanstack/react-query";
import { pageDataQuery } from "../../routes/ComicViewer";
import {
  CHAP_KEY,
  CHAP_ORDER_IN_BOOK,
  PAGE_ORDER_IN_CHAP,
  PAGE_KEY,
  PARAM_PAGE_UUID,
  PAGE_TIME_POSTED,
  PAGE_AUTHOR,
  PAGE_MESSAGE,
  AUTHOR_KEY,
  USER_DISPLAY_NAME,
} from "../../api/RefKeys";
import { PageLoadingSpinner } from "../generic/loading/Spinners";

export default function PageDetailsCard() {
  const params = useParams();
  const { data, isLoading } = useQuery(pageDataQuery(params[PARAM_PAGE_UUID]));
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  // Create default values in case something goes wrong
  let date = new Date();
  let volNum = "?";
  let pageNum = "?";
  let user = "Mo and Nate";
  let message = "You found the secret message!";

  if (PAGE_KEY in data) {
    if (PAGE_TIME_POSTED in data[PAGE_KEY]) {
      date = new Date(data[PAGE_KEY][PAGE_TIME_POSTED]);
    }
    if (PAGE_ORDER_IN_CHAP in data[PAGE_KEY]) {
      pageNum = String(data[PAGE_KEY][PAGE_ORDER_IN_CHAP]).padStart(2, "0");
    }
    if (PAGE_AUTHOR in data[PAGE_KEY]) {
      user = data[PAGE_KEY][PAGE_AUTHOR];
    }
    if (PAGE_MESSAGE in data[PAGE_KEY]) {
      message = data[PAGE_KEY][PAGE_MESSAGE];
    }
  }
  if (CHAP_KEY in data) {
    if (CHAP_ORDER_IN_BOOK in data[CHAP_KEY]) {
      volNum = String(data[CHAP_KEY][CHAP_ORDER_IN_BOOK] - 1).padStart(2, "0");
    }
  }
  if (AUTHOR_KEY in data) {
    if (USER_DISPLAY_NAME in data[AUTHOR_KEY]) {
      user = data[AUTHOR_KEY][USER_DISPLAY_NAME];
    }
  }
  let title = "Chap. " + volNum + " // Pg " + pageNum;

  return isDesktop ? (
    <DesktopPageDetailsCard
      message={message}
      user={user}
      date={date}
      title={title}
    />
  ) : (
    <MobilePageDetailsCard
      message={message}
      user={user}
      date={date}
      title={title}
    />
  );
}
