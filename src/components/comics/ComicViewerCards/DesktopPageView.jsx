import VerticalShare from '../VerticalShare';
import GracefulImage from '../GracefulImage';

export default function DesktopPageView(props) {
    return (
        <div className={"desktopComicPageContainer"}>
            <GracefulImage src={props.pageImageUrl} reference={props.topOfPageRef} keyVal="desktopComicPageImage"/>
            <div className="comicViewerVertShare ml-4">
                <VerticalShare sharePageUrl={props.sharePageUrl} title={props.title} shareImageUrl={props.pageImageUrl}/>
            </div>
        </div>
    )
}