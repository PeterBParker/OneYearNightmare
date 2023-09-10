import CardHeader from "../../generic/CardHeader";
import ChapterBanner from "./ChapterBanner";

import ComicPageAPI from "../../../api/ComicPageAPI";
import { useMediaQuery } from "react-responsive";
import querySizes from "../../../styling/breakpoints.json";
import { v4 as uuidv4 } from "uuid";

export default function ArchiveContent(props) {
  const isTabletOrDesktop = useMediaQuery({ query: querySizes["lg"] });

  let seasons = ComicPageAPI.getSeasons();
  let displayBanners = [];

  for (let seasonIndex in seasons) {
    let season = seasons[seasonIndex];
    let chapters = season["chapters"];
    let seasonPath = season["folderName"];
    for (let chapterIndex in chapters) {
      let chapter = chapters[chapterIndex];
      let chapterPath = seasonPath + "/" + chapter["folderName"];
      let chapterBannerKey = uuidv4().replace(/-/g, "");
      displayBanners.push(
        <ChapterBanner
          chapter={chapter}
          chapterPath={chapterPath}
          chapterName={`${chapter["chapterName"]}`}
          key={chapterBannerKey}
          bannerId={chapterBannerKey}
        />
      );
    }
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
