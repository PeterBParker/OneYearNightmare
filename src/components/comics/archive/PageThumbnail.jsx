import { COMIC_VIEWER_PATH } from "../../Main";
import { Link } from "react-router-dom";

export default function PageThumbnail(props) {

    return(
        <Link to={`${COMIC_VIEWER_PATH}/${props.pageId}`} className="m-3 pageThumbnail bg-cream-dark pt-2 rounded">
            <img src={props.imageSrc} loading="lazy" width={200} height={200} alt={props.altText} className="mx-auto"/>
            <div className="text-base bg-cream-dark text-grey-dark font-semibold rounded py-2">
                Page #{props.pageNum}
            </div>
        </Link>
    )
}