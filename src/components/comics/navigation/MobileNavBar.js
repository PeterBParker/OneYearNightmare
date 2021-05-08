import BackButton from './BackButton';
import NextButton from './NextButton';
import FirstPageButton from './FirstPageButton';
import LastPageButton from './LastPageButton';

export default function MobileNavBar(props) {

    return (
        <div className="mobileNavBarContainer bg-cream-light py-3">
            <div className="firstPageButtonMobile justify-self-end self-center">
                <FirstPageButton pageId={props.pageId}/>
            </div>
            <div className="prevPageButtonMobile justify-self-end self-center">
                <BackButton pageId={props.pageId} />
            </div>
            <div className="mysteryButtonMobile justify-self-center self-center">
                {/*Maybe this can be a zoom and pan button? Dunno how to implement*/}
            </div>
            <div className="nextButtonMobile justify-self-start self-center">
                <NextButton pageId={props.pageId} />
            </div>
            <div className="lastPageButtonMobile justify-self-start self-center">
                <LastPageButton pageId={props.pageId}/>
            </div>
        </div>
    );
}