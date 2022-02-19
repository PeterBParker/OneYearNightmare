import loading_comic_page from '../../assets/loading-comic-page.png';

export default function GracefulImage(props){

    const loadedPageEffect = () => {
        document.getElementById("gracefulComicPage").classList.remove("shimmerMask");
        document.getElementById("comicPageLoadingFiller").classList.remove("opacity-100");
        document.getElementById("comicPageLoadingFiller").classList.add("opacity-0");
    }
    let loadingImage =  <img src={loading_comic_page} alt="" id="comicPageLoadingFiller" className={`loadingComicImage shimmerFill transition-opacity opacity-100`}/>
    let loadedImage = <img
                        src={props.src}
                        alt={props.alt ? props.alt : ""}
                        ref={props.reference ? props.reference : ""}
                        id="gracefulComicPage"
                        onLoad={() => loadedPageEffect()}/>
                        
    return(
        <div className="comicPage">
            {loadingImage}
            {loadedImage}
        </div>
    );
}