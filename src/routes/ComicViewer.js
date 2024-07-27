import { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  BASE_PATH,
  COMIC_VIEWER_DEFAULT_PATH,
  DOMAIN,
  SNAP_TO_PAGE_PATH,
  PageAPI,
} from "../index";

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
  console.log("this is the page id", pageId);
  return {
    queryKey: [pageId],
    queryFn: pageFetcher,
  };
}

export function loader(queryClient) {
  return async ({ _, params }) => {
    console.log(params);
    const query = pageDataQuery(params[PARAM_PAGE_UUID]);
    return queryClient.ensureQueryData(query);
  };
}

export default function ComicViewer(props) {
  const params = useParams();
  const { data, isLoading } = useQuery();
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

  // TODO replace this with the React Router's Errorelement in the index file on this route
  let unknownRequestContent = (
    <div className="invalidComicPage">
      <div className="text-3xl our-red ">No page found. :(</div>
      <div>Check out our latest page!</div>
      <div className="mt-10">
        <Link
          className="p-4 border-2 rounded hover:bg-purple-700 hover:gray-50"
          to={COMIC_VIEWER_DEFAULT_PATH}
        >
          Home
        </Link>
      </div>
    </div>
  );

  // Snaps the display to the top of the page
  useEffect(() => {
    if (params.focus === SNAP_TO_PAGE_PATH) {
      scrollToTopOfPage();
    }
  }, [params.focus]);

  // Fetches the data we need to display the page and navigate.
  let releventObjs = PageAPI.getRelValidObjs(params.pageUuid);
  if (!releventObjs) {
    return (
      <div className={`${isDesktop ? "comicViewerDesktop" : ""} pb-24`}>
        <Header defaultBg={false} />
        {isDesktop ? <SimpleNavBar page={Pages.READ} /> : ""}
        {unknownRequestContent}
      </div>
    );
  }
  const path = PageAPI.getFilePath(releventObjs);

  const pageImageUrl = encodeURI(process.env.PUBLIC_URL + BASE_PATH + path);
  let title = "Monsters and Myriads Page " + params.pageUuid;
  const shareImageUrl = DOMAIN + pageImageUrl;
  const sharePageUrl = DOMAIN + "/read/" + params.pageUuid;
  // TODO 6/10 Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
  return pageImageUrl ? (
    <div className={`${isDesktop ? "pb-24" : null}`}>
      <Header defaultBg={false} />
      {isDesktop ? <SimpleNavBar page={Pages.READ} /> : ""}
      {isDesktop ? (
        <DesktopPageView
          pageId={params.pageUuid}
          topOfPageRef={topOfPageRef}
          clickEffects={loadNextPageEffects}
          pageImageUrl={pageImageUrl}
          isDesktop={isDesktop}
          chapter={releventObjs.chapterObj}
          page={releventObjs.pageObj}
        />
      ) : (
        <MobilePageView
          pageImageUrl={pageImageUrl}
          topOfPageRef={topOfPageRef}
          clickEffects={loadNextPageEffects}
          pageId={params.pageUuid}
          sharePageUrl={sharePageUrl}
          shareImageUrl={shareImageUrl}
          title={title}
          isDesktop={isDesktop}
          chapter={releventObjs.chapterObj}
          page={releventObjs.pageObj}
        />
      )}
      {/* <ReadPageCards
        page={releventObjs.pageObj}
        chapter={releventObjs.chapterObj}
        isDesktop={isDesktop}
      /> */}
    </div>
  ) : (
    <div className={`${isDesktop ? "" : ""} pb-24`}>
      <Header defaultBg={false} />
      {isDesktop ? <SimpleNavBar page={Pages.READ} /> : ""}
      {unknownRequestContent}
    </div>
  );
}
