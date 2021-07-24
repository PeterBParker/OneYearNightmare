import BackButton from './BackButton';
import NextButton from './NextButton';
import FirstPageButton from './FirstPageButton';
import LastPageButton from './LastPageButton';

export default function PageNavButtons(props) {

    let middleButton = null
    if (props.isMobile) {
        middleButton =  <div className="bookmarkButton justify-self-center self-center" onClick={() => props.setBookmark('mxmBookmarkedPage', props.pageId.toString(), {path: '/'})}>
                            <img src={props.bookmarkIcon} width={50} />
                        </div>
    }
    return (
        <div className={`${props.isMobile ? 'mobileNavButtonsContainer' : 'desktopNavButtonsContainer'} py-3`}>
            <div className="firstPageButton justify-self-end self-center">
                <FirstPageButton pageId={props.pageId}/>
            </div>
            <div className="prevPageButton justify-self-end self-center">
                <BackButton pageId={props.pageId} />
            </div>
            {middleButton}
            <div className="nextButton justify-self-start self-center">
                <NextButton pageId={props.pageId} />
            </div>
            <div className="lastPageButton justify-self-start self-center">
                <LastPageButton pageId={props.pageId}/>
            </div>
        </div>
    );
}