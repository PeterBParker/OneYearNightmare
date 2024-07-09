import { Outlet } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { docFetcher } from "../api/ComicPageAPI";
import { PageAPI } from "..";
import Loading from "../components/generic/Loading";
import Error from "../components/generic/Error";
import { COMIC_VIEWER_PATH } from "../index";
import { BOOKMARK_KEY } from "..";
import { DISPLAY_DATA_DOC_KEY, MAX_PAGE_ID_KEY } from "../api/RefKeys";

// Just returns an object useQuery expects
const maxPageIdQuery = () => ({
  queryKey: [DISPLAY_DATA_DOC_KEY, MAX_PAGE_ID_KEY],
  queryFn: docFetcher,
});

// Supplies an async function that either grabs the data out of the cache or
// refetches it.
export function loader(queryClient) {
  return async ({}) => {
    const query = maxPageIdQuery();
    return queryClient.ensureQueryData(query);
  };
}

export default function ComicRouter(props) {
  const { data, error, isLoading } = useQuery(maxPageIdQuery());
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  console.log(data);
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
