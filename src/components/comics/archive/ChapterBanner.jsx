import { useState } from "react";

export default function ChapterBanner(props) {
    const [isActive, setIsActive] = useState(false);

    let pagesDisplay = BuildChapterPagesDisplay(1);


    return(
        <div className="my-4 mx-6 font-header text-3xl text-center cursor-pointer">
            <div className="py-4 bg-eggshell hover:bg-grey-light hover:text-eggshell" onClick={() => setIsActive(() => !isActive)}>
                {props.chapterName}
            </div>
            {isActive ? pagesDisplay : null}
        </div>
    )
}

function BuildChapterPagesDisplay(chapterId) {
    let pagesDisplay = "hello world"
    //Get the images

    //Create icon/page details component

    //Append to a display object

    return pagesDisplay;
}