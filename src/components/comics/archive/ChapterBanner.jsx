import { useEffect, useState } from "react";
import { BASE_PATH } from "../../Main";
import PageThumbnail from "./PageThumbnail";


export default function ChapterBanner(props) {
    const [isActive, setIsActive] = useState(false);
    // Not using hover because I only want the effect triggered once per mouse entry
    const [isMouseOver, setIsMouseOver] = useState(false); 
    let pagesDisplay = BuildChapterPagesDisplay(props.chapter, props.chapterPath);


    useEffect(() => {
        const thisAccordion = document.getElementById(props.bannerId);
        const content = thisAccordion.querySelector(".accordion__content");
        if(isActive) {
            // Open the page thumbnail accordion
            thisAccordion.classList.add("accordion__active");
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            thisAccordion.classList.remove("accordion__active");
            content.style.maxHeight = null;
        }
    }, [isActive])




    return(
        <div className="accordion my-4 mx-6 font-header text-3xl text-center cursor-pointer" id={props.bannerId}>
            <div className={`accordion__banner py-4 ${isActive? "bg-mocha-dark text-eggshell": `${isMouseOver ? "bg-mocha-dark text-eggshell" : "bg-cream-dark"}`}  transition-colors px-4`} onClick={() => setIsActive(() => !isActive)} onMouseEnter={() => setIsMouseOver(true)} onMouseLeave={() => setIsMouseOver(false)}>
                {props.chapterName}
            </div>
            <div className="accordion__content">
                <div className="flex flex-wrap justify-center mx-auto">
                    {pagesDisplay}
                </div>
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