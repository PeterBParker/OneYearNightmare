import { Switch, Route, Redirect } from "react-router-dom";
import ComicViewer from "./ComicViewer";
import ComicPageAPI from "../../api/ComicPageAPI";
import { COMIC_VIEWER_PATH } from "../Main";
import { BOOKMARK_KEY } from "../..";

export default function ComicRouter(props) {
  const maxPage = ComicPageAPI.getMaxDisplayPage();

  let bookmarkedPageUrl = COMIC_VIEWER_PATH + "/";
  let bookmarkedPageId = localStorage.getItem(BOOKMARK_KEY);
  if (bookmarkedPageId && ComicPageAPI.isExistingPage(bookmarkedPageId)) {
    bookmarkedPageUrl = bookmarkedPageUrl.concat(bookmarkedPageId);
  } else {
    // If there is no value stored, we send the reader to the first page on the latest update
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
