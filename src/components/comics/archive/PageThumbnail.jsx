import { COMIC_VIEWER_PATH } from "../../Main";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PageThumbnail(props) {
    const [hovering, setHovering] = useState(false)



    return(
        <Link to={`${COMIC_VIEWER_PATH}/${props.pageId}`} className="m-3 py-2 pageThumbnail relative" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className={`rounded filter bg-white grow pt-2 px-2${hovering? 'drop-shadow-md': 'drop-shadow'}`}>
                <img src={props.imageSrc} loading="lazy" width={200} height={200} alt={props.altText} className="mx-auto"/>
                <div className="text-grey-dark text-center archivePageThumbnailBanner">
                    <div className="font-medium text-lg px-2">
                        Page #{props.pageId}
                    </div>
                </div>
            </div>

            
        </Link>
    )
}