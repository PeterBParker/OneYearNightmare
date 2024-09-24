import ArchiveMobile from "../components/comics/archive/ArchiveMobile";
import ArchiveDesktop from "../components/comics/archive/ArchiveDesktop";

import { useMediaQuery } from "react-responsive";
import querySizes from "../styling/breakpoints.json";
import { allPagesFetcher } from "../api/ComicPageAPI";

export function allPagesQuery(){
  return {
    queryKey: ["archive"],
    queryFn: allPagesFetcher,
  };
}

export function loader (queryClient) {
  return async () => {
    const query = allPagesQuery();
    return queryClient.ensureQueryData(query);
  };
}

export default function Archive() {
  const isTabletOrDesktop = useMediaQuery({ query: querySizes["lg"] });

  return isTabletOrDesktop ? <ArchiveDesktop /> : <ArchiveMobile />;
}
