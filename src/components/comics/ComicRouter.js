import { Switch, Route, Redirect } from "react-router-dom";
import ComicViewer from "./ComicViewer";
import { useCookies } from "react-cookie";
import ComicPageAPI from "../../api/ComicPageAPI";
import { COMIC_VIEWER_PATH } from "../Main";

export default function ComicRouter(props) {
  const [cookies, setCookie] = useCookies(["mxmBookmarkedPage"]);

  const maxPage = ComicPageAPI.getMaxDisplayPage();

  let bookmarkedPageUrl = COMIC_VIEWER_PATH + "/";
  if (cookies.mxmBookmarkedPage) {
    bookmarkedPageUrl = bookmarkedPageUrl.concat(cookies.mxmBookmarkedPage);
  } else {
    // If there is no cookie, we send the reader to the first page on the latest update
    bookmarkedPageUrl = bookmarkedPageUrl.concat(maxPage.toString());
  }
  return (
    <div className="comicViewerPage">
      <Switch>
        <Route exact path={COMIC_VIEWER_PATH}>
          <Redirect to={bookmarkedPageUrl} />
        </Route>
        <Route path="/read/:pageUuid/:focus" component={ComicViewer} />
        <Route path="/read/:pageUuid" component={ComicViewer} />
      </Switch>
    </div>
  );
}
