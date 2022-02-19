import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeLastIcon from '../../../assets/FINAL-ASSETS-072821/final assets/right-skip-30px.png';
import disabledLastIcon from '../../../assets/FINAL-ASSETS-072821/final assets/right-skip-light-30px.png';

export default function LastPageButton(props) {
    const disabledButton = <div className="navButton"><img src={disabledLastIcon} width={30} alt="disabled navigation last page button"/></div>;
    const lastPageId = ComicPageAPI.getMaxDisplayPage();

    let isValidId = ComicPageAPI.validatePageId(lastPageId);
    if(!isValidId || props.pageId === lastPageId) {
        return disabledButton;
    }

    let pageInfo = ComicPageAPI.getPage(lastPageId);

    if(pageInfo) {
        const pageFilePath = '/read/' + lastPageId;
        return(
            <div className="navButton" onClick={props.clickEffects}><Link to={pageFilePath}><img src={activeLastIcon} width={30} alt="enabled navigation last page button"/></Link></div>
        );
    } else {
        return(
            disabledButton
        )
    }
    
}