import { useState } from "react";
import { BASE_PATH } from "../../Main";
import PageThumbnail from "./PageThumbnail";


export default function ChapterBanner(props) {
    const [isActive, setIsActive] = useState(false);

    let pagesDisplay = BuildChapterPagesDisplay(props.chapter, props.chapterPath);


    return(
        <div className="my-4 mx-6 font-header text-3xl text-center cursor-pointer">
            <div className="py-4 bg-cream-dark hover:bg-grey-light hover:text-eggshell transition-colors" onClick={() => setIsActive(() => !isActive)}>
                {props.chapterName}
            </div>
            <div className="flex flex-wrap mx-auto">
                {isActive ? pagesDisplay : null}
            </div>

        </div>
    )
}

function BuildChapterPagesDisplay(chapter, chapterPath) {
    let pagesDisplay = []
    for (let pageIndex in chapter["pages"]) {
        let page = chapter["pages"][pageIndex];
        let iconPath = encodeURI(process.env.PUBLIC_URL + BASE_PATH + chapterPath + "/" + page["icon"])
        pagesDisplay.push(<PageThumbnail imageSrc={iconPath} pageId={page["id"]} pageNum={page["pageNum"]} altText={page["title"]} key={`archiveThumbnailPage${page["id"]}`}/>)
    }
    //Get the images

    //Create icon/page details component

    //Append to a display object

    return pagesDisplay;
}