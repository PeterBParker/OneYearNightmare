import { docFetcher, getComicHomeURL } from "../api/ComicPageAPI";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DISPLAY_DATA_DOC_KEY } from "../api/RefKeys";
import { MAX_PAGE_ID_KEY } from "../api/RefKeys";
import { PageLoadingSpinner } from "../components/generic/loading/Spinners";

// Just returns an object useQuery expects
// This query should encapsulate all the data we need for the queryFn
// to get the non-page specific data that is required (max page id, min page id, etc.)
export const displayQuery = () => ({
  queryKey: [DISPLAY_DATA_DOC_KEY],
  queryFn: docFetcher,
});

// Supplies an async function that either grabs the data out of the cache or
// refetches it.
export function loader(queryClient) {
  return async ({}) => {
    const query = displayQuery();
    return queryClient.ensureQueryData(query);
  };
}

export default function Reader() {
  const { data, isLoading } = useQuery(displayQuery());
  if (isLoading){
    return <PageLoadingSpinner/>
  }
  const HOME_URL = getComicHomeURL(data[MAX_PAGE_ID_KEY]);
  return <Navigate to={HOME_URL} />;
}
