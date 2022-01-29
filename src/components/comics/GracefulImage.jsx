import { useState } from "react"
import loading_comic_page from '../../assets/loading_comic_page.png';

export default function GracefulImage(props){
    let [loaded, setLoaded] = useState(false);

    let loadingImage =  <img src={loading_comic_page} alt="" className="comicPage loadingComicImage"/>
                        

    let loadedImage = <img  
                    src={props.src}
                    alt={props.alt ? props.alt : ""}
                    className={props.className ? props.className : ""}
                    ref={props.reference ? props.reference : ""}
                    key={props.keyVal}
                    onLoad={() => setLoaded(true)}/>

    return([loadingImage])
}