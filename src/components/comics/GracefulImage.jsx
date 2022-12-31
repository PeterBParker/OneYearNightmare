import loading_comic_page from '../../assets/loading-comic-page.png';

export default function GracefulImage(props){

    const loadedPageEffect = () => {
        document.getElementById("gracefulComicPage").classList.remove("shimmerMask");
    }
    let loadedImage = <img
                        src={props.src}
                        alt={props.alt ? props.alt : ""}
                        ref={props.reference ? props.reference : ""}
                        id="gracefulComicPage"
                        onLoad={() => loadedPageEffect()}/>
                        
    return(
        <div className="comicPage">
            {loadedImage}
        </div>
    );
}