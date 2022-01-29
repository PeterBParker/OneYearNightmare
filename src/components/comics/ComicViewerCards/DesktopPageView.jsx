import VerticalShare from '../VerticalShare';
import GracefulImage from '../GracefulImage';

export default function DesktopPageView(props) {
    return (
        <div className={"desktopComicPageContainer"}>
            <GracefulImage src={props.pageImageUrl} className="comicPage" reference={props.topOfPageRef} keyVal="desktopComicPageImage"/>
            {/*<img  ref={props.topOfPageRef} src={props.pageImageUrl} alt="test" className="comicPage"/>*/}
            <div className="comicViewerVertShare ml-4">
                <VerticalShare sharePageUrl={props.sharePageUrl} title={props.title} shareImageUrl={props.pageImageUrl}/>
            </div>
        </div>
    )
}