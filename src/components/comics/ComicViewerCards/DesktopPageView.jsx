import VerticalShare from '../VerticalShare';

export default function DesktopPageView(props) {
    return (
        <div className={"desktopComicPageContainer"}>
            <img src={props.pageImageUrl} alt="test" className="comicPage"/>
            <div className="comicViewerVertShare ml-4">
                <VerticalShare />
            </div>
        </div>
    )
}