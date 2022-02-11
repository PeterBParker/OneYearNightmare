import { COMIC_VIEWER_PATH } from "../../Main";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PageThumbnail(props) {
    const [shouldBlur, setShouldBlur] = useState(false)

    return(
        <Link to={`${COMIC_VIEWER_PATH}/${props.pageId}`} className="m-3 pageThumbnail" onMouseEnter={() => setShouldBlur(true)} onMouseLeave={() => setShouldBlur(false)}>
            <img src={props.imageSrc} loading="lazy" width={200} height={200} alt={props.altText} className={`mx-auto transition-all filter drop-shadow ${shouldBlur ? "blur-sm grayscale brightness-90": null}`}/>
        </Link>
    )
}