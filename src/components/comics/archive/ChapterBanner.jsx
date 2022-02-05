import { useState } from "react";
import { BASE_PATH } from "../../Main";


export default function ChapterBanner(props) {
    const [isActive, setIsActive] = useState(false);

    let pagesDisplay = BuildChapterPagesDisplay(1, props.chapterName);


    return(
        <div className="my-4 mx-6 font-header text-3xl text-center cursor-pointer">
            <div className="py-4 bg-eggshell hover:bg-grey-light hover:text-eggshell" onClick={() => setIsActive(() => !isActive)}>
                {props.chapterName}
            </div>
            {isActive ? pagesDisplay : null}
        </div>
    )
}

function BuildChapterPagesDisplay(chapterId, chapterName) {
    let pagesDisplay = <img source={encodeURI(process.env.PUBLIC_URL + BASE_PATH + "prologue/chapter1/icons/PRO2-Icon.png")} loading="lazy" width={150} height={150} alt="test" key={`${chapterName}-${chapterId}`}/>
    //Get the images

    //Create icon/page details component

    //Append to a display object

    return pagesDisplay;
}