import { COMIC_VIEWER_PATH } from "../../Main";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PageThumbnail(props) {
    const [hovering, setHovering] = useState(false)



    return(
        <Link to={`${COMIC_VIEWER_PATH}/${props.pageId}`} className="m-3 pageThumbnail relative" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <img src={props.imageSrc} loading="lazy" width={200} height={200} alt={props.altText} className={` block w-100 background-image mx-auto transition-all filter drop-shadow ${hovering ? "blur-sm grayscale brightness-90": null}`}/>
            {hovering?
                <div className="absolute top-10 left-0 text-eggshell w-full">
                    <div className="font-medium">
                        Page #{props.pageId}
                    </div>
                    <br/>
                    <div className="text-lg text-left px-4">
                        {props.altText}
                    </div>

                </div>
            : 
                null}
        </Link>
    )
}