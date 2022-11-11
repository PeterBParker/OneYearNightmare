import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeNextIcon from '../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-30px.png';
import disabledNextIcon from '../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-light-30px.png';

export default function NextButton(props) {
    const disabledButton = <div className="navButton"><img src={disabledNextIcon} width={30} alt="disabled navigation next page button"/></div>;
    const nextPageId = props.pageId+1;

    let isValidId = ComicPageAPI.validatePageNum(nextPageId);
    if(!isValidId) {
        return (disabledButton);
    }

    if(isValidId) {
        const pageFilePath = '/read/' + nextPageId;
        return(
            <div className="navButton" onClick={props.clickEffects}><Link to={pageFilePath}><img src={activeNextIcon} width={30} alt="enabled navigation next page button"/></Link></div>
        );
    } else {
        return(
            disabledButton
        );
    }
    
}