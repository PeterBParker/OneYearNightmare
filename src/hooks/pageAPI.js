import { useQuery } from "@tanstack/react-query";

import { docFetcher } from "../api/ComicPageAPI";

export function useFirestoreDoc(docKey, fieldKey) {
  const { data, error, isLoading } = useQuery({
    queryKey: [docKey, fieldKey],
    queryFn: docFetcher,
  });

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
}
