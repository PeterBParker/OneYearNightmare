import { COMIC_VIEWER_PATH } from "../../Main";
import { Link } from "react-router-dom";

export default function PageThumbnail(props) {

    return(
        <Link to={`${COMIC_VIEWER_PATH}/${props.pageId}`}>
            <img src={props.imageSrc} loading="lazy" width={200} height={200} alt={props.altText}/>
            <div>
                Page #{props.pageNum}
            </div>
        </Link>
    )
}