import { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";

import { SNAP_TO_PAGE_PATH } from "../index";

import DesktopPageView from "../components/comics/ComicViewerCards/DesktopPageView";
import MobilePageView from "../components/comics/ComicViewerCards/MobilePageView";
import Header from "../components/header/Header";
import Pages from "../components/comics/navigation/desktop/Pages";
import querySizes from "../styling/breakpoints.json";
import SimpleNavBar from "../components/comics/navigation/desktop/SimpleNavBar";
import { pageFetcher } from "../api/ComicPageAPI";
import { PARAM_PAGE_UUID } from "../api/RefKeys";

// Returns the query that encapsulates all the data we need for queryFn
// to get the page specific data that is required
export function pageDataQuery(pageId) {
  return {
    queryKey: [pageId],
    queryFn: pageFetcher,
  };
}

export function loader(queryClient) {
  return async ({ _, params }) => {
    const query = pageDataQuery(params[PARAM_PAGE_UUID]);
    return queryClient.ensureQueryData(query);
  };
}

export default function ComicViewer(props) {
  const params = useParams();
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });
  const topOfPageRef = useRef(null);

  const scrollToTopOfPage = () => {
    topOfPageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const addShimmer = () => {
    let element = document.getElementById("gracefulComicPage");
    element.classList.add("shimmerMask");
  };

  const loadNextPageEffects = () => {
    addShimmer();
    scrollToTopOfPage();
  };

  // Snaps the display to the top of the page
  useEffect(() => {
    if (params.focus === SNAP_TO_PAGE_PATH) {
      scrollToTopOfPage();
    }
  }, [params.focus]);

  // TODO 6/10 Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
  return (
    <div className={`${isDesktop ? "pb-24" : null}`}>
      {isDesktop ? <SimpleNavBar page={Pages.READ} /> : ""}
      {isDesktop ? (
        <DesktopPageView
          topOfPageRef={topOfPageRef}
          clickEffects={loadNextPageEffects}
          isDesktop={isDesktop}
        />
      ) : (
        <MobilePageView
          topOfPageRef={topOfPageRef}
          clickEffects={loadNextPageEffects}
          isDesktop={isDesktop}
        />
      )}
    </div>
  );
}
