import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeLastIcon from '../../../assets/FINAL-ASSETS-072821/final assets/right-skip-30px.png';
import disabledLastIcon from '../../../assets/FINAL-ASSETS-072821/final assets/right-skip-light-30px.png';

export default function LastPageButton(props) {
    const disabledButton = <div className="navButton"><img src={disabledLastIcon} width={30}/></div>;
    const lastPageId = ComicPageAPI.getTotalPageCount();

    let isValidId = ComicPageAPI.validatePageId(lastPageId);
    if(!isValidId || props.pageId == lastPageId) {
        return disabledButton;
    }

    let pageInfo = ComicPageAPI.getPage(lastPageId);

    if(pageInfo) {
        const pageFilePath = '/read/' + lastPageId;
        return(
            <div className="navButton" onClick={props.scrollToTopOfPage}><Link to={pageFilePath}><img src={activeLastIcon} width={30}/></Link></div>
        );
    } else {
        return(
            disabledButton
        )
    }
    
}