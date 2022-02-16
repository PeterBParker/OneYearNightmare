import { COMIC_VIEWER_PATH } from "../../Main";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PageThumbnail(props) {
    const [hovering, setHovering] = useState(false)
    const [loaded, setLoaded] = useState(false)



    return(
        <Link to={`${COMIC_VIEWER_PATH}/${props.pageId}`} className={`m-3 py-2 pageThumbnail relative transition-opacity duration-300 ${loaded ? null : 'shimmerFillHighContrast archiveLoadingThumbnail opacity-30 rounded'}`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className={`rounded filter bg-white grow pt-2 px-2 ${hovering? 'drop-shadow-md': 'drop-shadow'} ${loaded ? 'opacity-100 loaded-animation' : 'opacity-0'}`}>
                <img src={props.imageSrc} loading="lazy" width={200} height={200} alt={props.altText} className="mx-auto" onLoad={() => setLoaded(true)}/>
                <div className="text-grey-dark text-center archivePageThumbnailBanner">
                    <div className="font-medium text-lg px-2">
                        Page #{props.pageId}
                    </div>
                </div>
            </div>

            
        </Link>
    )
}