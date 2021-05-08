import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeLastIcon from '../../../assets/Website Assets - Phase 1/SVG/NAVBAR-most-recent.svg';
import disabledLastIcon from '../../../assets/Website Assets - Phase 1/SVG/NAVBAR-most-recent-disabled.svg';

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
            <div className="navButton"><Link to={pageFilePath}><img src={activeLastIcon} width={30}/></Link></div>
        );
    } else {
        return(
            disabledButton
        )
    }
    
}