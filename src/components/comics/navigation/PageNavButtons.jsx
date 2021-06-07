import BackButton from './BackButton';
import NextButton from './NextButton';
import FirstPageButton from './FirstPageButton';
import LastPageButton from './LastPageButton';

export default function PageNavButtons(props) {

    return (
        <div className="navButtonsContainer flex flex-row bg-cream-light py-3">
            <div className="firstPageButton justify-self-end self-center">
                <FirstPageButton pageId={props.pageId}/>
            </div>
            <div className="prevPageButton justify-self-end self-center">
                <BackButton pageId={props.pageId} />
            </div>
            <div className="mysteryButton justify-self-center self-center">
                {/*Maybe this can be a zoom and pan button? Dunno how to implement*/}
            </div>
            <div className="nextButton justify-self-start self-center">
                <NextButton pageId={props.pageId} />
            </div>
            <div className="lastPageButton justify-self-start self-center">
                <LastPageButton pageId={props.pageId}/>
            </div>
        </div>
    );
}