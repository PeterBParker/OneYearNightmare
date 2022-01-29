import { Suspense} from "react"
import loading_comic_page from '../../assets/loading-comic-page.png';

export default function GracefulImage(props){

    let loadingImage =  <img src={loading_comic_page} alt="" className="comicPage loadingComicImage shimmerFill"/>
                        
    return(
        <Suspense fallback={loadingImage}>
            <img
                src={props.src}
                alt={props.alt ? props.alt : ""}
                className={`${props.className ? props.className : ""}`}
                ref={props.reference ? props.reference : ""}
                id="gracefulComicPage"
                onLoad={() => document.getElementById("gracefulComicPage").classList.remove("shimmerMask")}/>
                
        </Suspense>
    )
}