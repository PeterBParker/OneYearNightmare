import CardHeader from "../../generic/CardHeader"
import ChapterBanner from "./ChapterBanner";

import ComicPageAPI from "../../../api/ComicPageAPI";
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

export default function ArchiveContent(props) {
    const isTabletOrDesktop = useMediaQuery({query: querySizes['lg']});

    let seasons = ComicPageAPI.getSeasons();
    let displayBanners = [];

    for(let seasonIndex in seasons) {
        let season = seasons[seasonIndex];
        let chapters = season["chapters"];
        for(let chapterIndex in chapters) {
            let chapter = chapters[chapterIndex];
            displayBanners.push(<ChapterBanner chapterName={`${season["seasonName"]} - ${chapter["chapterName"]}`}/>)
        }
    }


    return(
        <div className={`archiveContent mx-auto mt-4 mb-12 ${isTabletOrDesktop ? "desktopCard" : ""}`}>
            <CardHeader isDesktop={isTabletOrDesktop} text="Archive"/>
            {displayBanners}
        </div>
    )
}