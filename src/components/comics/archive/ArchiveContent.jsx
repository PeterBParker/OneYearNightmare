import CardHeader from "../../generic/CardHeader";
import ChapterBanner from "./ChapterBanner";

import { useMediaQuery } from "react-responsive";
import querySizes from "../../../styling/breakpoints.json";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { allPagesQuery } from "../../../routes/Archive";
import { PageLoadingSpinner } from "../../generic/loading/Spinners";

export default function ArchiveContent(props) {
  const isTabletOrDesktop = useMediaQuery({ query: querySizes["lg"] });
  const {data, isLoading} = useQuery(allPagesQuery());

  if (isLoading) {
    return(
      <PageLoadingSpinner />
    )
  }

  let chapters = data["chapters"]
  let displayBanners = [];

    for (let chapterIndex in chapters) {
      let chapter = chapters[chapterIndex];
      let chapterBannerKey = uuidv4().replace(/-/g, "");
      // only the pages in the chapter sorted by chapter order
      let pagesContained = data["pages"][chapter["uuid"]]
      displayBanners.push(
        <ChapterBanner
          pages={pagesContained}
          chapterName={`${chapter["chapter_name"]}`}
          key={chapterBannerKey}
          bannerId={chapterBannerKey}
        />
      );
    }

  return (
    <div
      className={`archiveContent mx-auto  mb-12 ${
        isTabletOrDesktop
          ? "desktopCard mt-4 bg-white"
          : "pb-4 whiteBackgroundColorFade"
      }`}
    >
      <CardHeader isDesktop={isTabletOrDesktop} text="Archive" />
      <div className="my-8">{displayBanners}</div>
    </div>
  );
}
