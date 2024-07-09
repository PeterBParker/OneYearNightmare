import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { PageAPI } from "..";
import Loading from "../components/generic/Loading";
import Error from "../components/generic/Error";
import ComicViewer from "../components/comics/ComicViewer";
import { useFirestoreDoc } from "../hooks/pageAPI";
import { COMIC_VIEWER_PATH } from "../index";
import { BOOKMARK_KEY } from "..";
import { DISPLAY_DATA_DOC_KEY, MAX_PAGE_ID_KEY } from "../api/RefKeys";

export default function ComicRouter(props) {
  const { data, error, isLoading } = useFirestoreDoc(
    DISPLAY_DATA_DOC_KEY,
    MAX_PAGE_ID_KEY
  );
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  console.log("This is the max page id! " + data);
  let bookmarkedPageUrl = COMIC_VIEWER_PATH + "/";
  let bookmarkedPageId = localStorage.getItem(BOOKMARK_KEY);
  if (bookmarkedPageId && PageAPI.isExistingPage(bookmarkedPageId)) {
    bookmarkedPageUrl = bookmarkedPageUrl.concat(bookmarkedPageId);
  } else {
    // If there is no value stored, we send the reader to the first page on the latest update
    bookmarkedPageUrl = bookmarkedPageUrl.concat(data.toString());
  }
  return (
    <div className="comicViewerPage">
      {/* <Route
          exact
          path={COMIC_VIEWER_PATH}
          element={<Navigate to={bookmarkedPageUrl} />}
        ></Route> */}
      <Outlet />
    </div>
  );
}
