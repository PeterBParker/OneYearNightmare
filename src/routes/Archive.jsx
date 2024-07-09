import ArchiveMobile from "../components/comics/archive/ArchiveMobile";
import ArchiveDesktop from "../components/comics/archive/ArchiveDesktop";

import { useMediaQuery } from "react-responsive";
import querySizes from "../styling/breakpoints.json";

export default function Archive() {
  const isTabletOrDesktop = useMediaQuery({ query: querySizes["lg"] });

  return isTabletOrDesktop ? <ArchiveDesktop /> : <ArchiveMobile />;
}
