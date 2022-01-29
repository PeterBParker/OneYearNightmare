import GracefulImage from "../GracefulImage";

export default function MobilePageView(props) {
    return (
        <div className={"mobileComicPageContainer bg-cream-dark"}>
            <GracefulImage src={props.pageImageUrl} className="ml-auto mr-auto" reference={props.topOfPageRef} keyVal="mobileComicPageImage"/>
        </div>
    )
}