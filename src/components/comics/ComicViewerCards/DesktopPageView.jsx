import VerticalShare from '../VerticalShare';

export default function DesktopPageView(props) {
    return (
        <div className={"desktopComicPageContainer"}>
            <img ref={props.topOfPageRef} src={props.pageImageUrl} alt="test" className="comicPage"/>
            <div className="comicViewerVertShare ml-4">
                <VerticalShare sharePageUrl={props.sharePageUrl} title={props.title} shareImageUrl={props.pageImageUrl}/>
            </div>
        </div>
    )
}