import VerticalShare from '../VerticalShare';

export default function DesktopPageView(props) {
    console.log(props.sharePageUrl)
    return (
        <div className={"desktopComicPageContainer"}>
            <img ref={props.topOfPageRef} src={props.pageImageUrl} alt="test" className="comicPage"/>
            <div className="comicViewerVertShare ml-4">
                <VerticalShare sharePageUrl={props.sharePageUrl} title={props.title}/>
            </div>
        </div>
    )
}