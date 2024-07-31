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
} from "../../api/RefKeys";
import { BigSpinner } from "../generic/loading/Spinners";

export default function PageDetailsCard(props) {
  const params = useParams();
  const { data, isLoading } = useQuery(pageDataQuery(params[PARAM_PAGE_UUID]));
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });

  if (isLoading) {
    return <BigSpinner />;
  }

  // Create default values in case something goes wrong
  let date = new Date();
  let volNum = "?";
  let pageNum = "?";

  if (PAGE_KEY in data) {
    if (PAGE_TIME_POSTED in data[PAGE_KEY]) {
      date = new Date(data[PAGE_KEY][PAGE_TIME_POSTED]);
    }
    if (PAGE_ORDER_IN_CHAP in data[PAGE_KEY]) {
      pageNum = String(data[PAGE_KEY][PAGE_ORDER_IN_CHAP]).padStart(2, "0");
    }
  }
  if (CHAP_KEY in data) {
    if (CHAP_ORDER_IN_BOOK in data[CHAP_KEY]) {
      volNum = String(data[CHAP_KEY][CHAP_ORDER_IN_BOOK] - 1).padStart(2, "0");
    }
  }
  let title = "Chap. " + volNum + " // Pg " + pageNum;

  return isDesktop ? (
    <DesktopPageDetailsCard page={data} date={date} title={title} />
  ) : (
    <MobilePageDetailsCard page={data} date={date} title={title} />
  );
}
