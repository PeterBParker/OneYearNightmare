import { Switch, Route } from "react-router-dom";
import ComicPageAPI from "../api/ComicPageAPI";
import ComicRouter from "./comics/ComicRouter";
import { useMediaQuery } from "react-responsive";
import querySizes from "../styling/breakpoints.json";
import Home from "./Home";
import Archive from "./comics/archive/Archive";
import Creators from "./creators/about/Creators";
import Support from "./creators/supportUsCards/Support";
import SignInPage from "./users/pages/SignInPage";

export const DOMAIN = "https://monstersandmyriads.com";
export const BASE_PATH = "/MnMPages/";

export const COMIC_VIEWER_PATH = "/read";
export const COMIC_VIEWER_DEFAULT_PATH =
  COMIC_VIEWER_PATH + "/" + ComicPageAPI.getFirstPageId();
export const SUPPORT_PAGE_PATH = "/support";
export const ARCHIVE_PAGE_PATH = "/archive";
export const CREATIVES_PAGE_PATH = "/creatives";
export const SIGNIN_PAGE_PATH = "/login";

export const JOINT_SIG = "Mo and Nate";
export const NO_USER_ID = "null";
export const SNAP_TO_PAGE_PATH = "snap-to-page";
export const MAX_COMMENT_CHARS = 350;

export default function Main() {
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });

  return (
    <div
      className={`main flex-grow backgroundTransition desktopBg ${
        isDesktop ? "comicViewerDesktop" : null
      }`}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path={CREATIVES_PAGE_PATH}>
          <Creators />
        </Route>
        <Route path={SUPPORT_PAGE_PATH}>
          <Support />
        </Route>
        <Route path={COMIC_VIEWER_PATH}>
          <ComicRouter />
        </Route>
        <Route path={ARCHIVE_PAGE_PATH}>
          <Archive />
        </Route>
        <Route path={SIGNIN_PAGE_PATH}>
          <SignInPage />
        </Route>
      </Switch>
    </div>
  );
}
