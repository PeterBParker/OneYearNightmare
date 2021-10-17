
export default function MobilePageView(props) {
    return (
        <div className={"mobileComicPageContainer bg-cream-dark"}>
            <img ref={props.topOfPageRef} src={props.pageImageUrl} alt="test" className="ml-auto mr-auto"/>
        </div>
    )
}