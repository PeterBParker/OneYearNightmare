import BackButton from './BackButton';
import NextButton from './NextButton';
import FirstPageButton from './FirstPageButton';
import LastPageButton from './LastPageButton';

export default function PageNavButtons(props) {

    function addYearToToday() {
        let d = new Date();
        let y = d.getFullYear();
        return new Date(d.setFullYear(y+1));
    }

    let middleButton = null
    if (props.isMobile) {
        middleButton =  <div className="bookmarkButton justify-self-center self-center" onClick={() => props.setBookmark('mxmBookmarkedPage', props.pageId.toString(), {path: '/', expires: addYearToToday()})}>
                            <img src={props.bookmarkIcon} width={40} alt="bookmark button"/>
                        </div>
    }
    return (
        <div className={`${props.isMobile ? 'mobileNavButtonsContainer' : 'desktopNavButtonsContainer'} py-3`}>
            <div className="firstPageButton justify-self-end self-center">
                <FirstPageButton pageId={props.pageId} scrollToTopOfPage={props.scrollToTopOfPage}/>
            </div>
            <div className="prevPageButton justify-self-end self-center">
                <BackButton pageId={props.pageId} scrollToTopOfPage={props.scrollToTopOfPage}/>
            </div>
            {middleButton}
            <div className="nextButton justify-self-start self-center">
                <NextButton pageId={props.pageId} scrollToTopOfPage={props.scrollToTopOfPage}/>
            </div>
            <div className="lastPageButton justify-self-start self-center">
                <LastPageButton pageId={props.pageId} scrollToTopOfPage={props.scrollToTopOfPage}/>
            </div>
        </div>
    );
}