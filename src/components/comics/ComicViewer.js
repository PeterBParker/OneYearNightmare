import loadable from "@loadable/component";
import ComicPageAPI from "../../api/ComicPageAPI";
import NavBar from "./navigation/NavBar";
import DesktopPageView from "./ComicViewerCards/DesktopPageView";
import MobilePageView from "./ComicViewerCards/MobilePageView";
import Header from "../header/Header";

import { useParams, Link } from "react-router-dom";

import {
  BASE_PATH,
  COMIC_VIEWER_DEFAULT_PATH,
  DOMAIN,
  SNAP_TO_PAGE_PATH,
} from "../Main";

import Pages from "./navigation/desktop/Pages";
import { useMediaQuery } from "react-responsive";
import querySizes from "../../styling/breakpoints.json";
import HorizontalShare from "./HorizontalShare";
import SimpleNavBar from "../comics/navigation/desktop/SimpleNavBar";
import { useRef, useEffect } from "react";

const ReadPageCards = loadable(() =>
  import("./ComicViewerCards/ReadPageCards")
);

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
  let releventObjs = ComicPageAPI.getRelValidObjs(params.pageUuid);
  if (!releventObjs) {
    return (
      <div className={`${isDesktop ? "comicViewerDesktop" : ""} pb-24`}>
        <Header defaultBg={false} />
        {isDesktop ? <SimpleNavBar page={Pages.READ} /> : ""}
        {unknownRequestContent}
      </div>
    );
  }
  const path = ComicPageAPI.getFilePath(releventObjs);

  const pageImageUrl = encodeURI(process.env.PUBLIC_URL + BASE_PATH + path);
  let title = "Monsters and Myriads Page " + params.pageUuid;
  const shareImageUrl = DOMAIN + pageImageUrl;
  const sharePageUrl = DOMAIN + "/read/" + params.pageUuid;
  // TODO 6/10 Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
  return pageImageUrl ? (
    <div className={`${isDesktop ? "pb-24" : "pb-16"}`}>
      <Header defaultBg={false} />
      {isDesktop ? <SimpleNavBar page={Pages.READ} /> : ""}
      {isDesktop ? (
        <DesktopPageView
          pageId={params.pageUuid}
          topOfPageRef={topOfPageRef}
          clickEffects={loadNextPageEffects}
          pageImageUrl={pageImageUrl}
        />
      ) : (
        <MobilePageView
          pageImageUrl={pageImageUrl}
          topOfPageRef={topOfPageRef}
          clickEffects={loadNextPageEffects}
          pageId={params.pageUuid}
        />
      )}
      {isDesktop ? (
        ""
      ) : (
        <HorizontalShare
          sharePageUrl={sharePageUrl}
          shareImageUrl={shareImageUrl}
          title={title}
        />
      )}
      <ReadPageCards
        page={releventObjs.pageObj}
        chapter={releventObjs.chapterObj}
        isDesktop={isDesktop}
      />
    </div>
  ) : (
    <div className={`${isDesktop ? "" : ""} pb-24`}>
      <Header defaultBg={false} />
      {isDesktop ? <SimpleNavBar page={Pages.READ} /> : ""}
      {unknownRequestContent}
    </div>
  );
}
