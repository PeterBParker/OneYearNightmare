import { docFetcher, getComicHomeURL } from "../api/ComicPageAPI";
import { Navigate } from "react-router-dom";
import { COMIC_VIEWER_PATH } from "../index";
import { useQuery } from "@tanstack/react-query";
import { DISPLAY_DATA_DOC_KEY, MAX_PAGE_ID_KEY } from "../api/RefKeys";

// Just returns an object useQuery expects
export const maxPageIdQuery = () => ({
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

export default function Home() {
  const { data } = useQuery(maxPageIdQuery());
  const HOME_URL = getComicHomeURL(data);
  return <Navigate to={HOME_URL} />;
}
