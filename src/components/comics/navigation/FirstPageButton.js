import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeFirstIcon from '../../../assets/Website Assets - Phase 1/SVG/NAVBAR-first.svg';
import disabledFirstIcon from '../../../assets/Website Assets - Phase 1/SVG/NAVBAR-first-disabled.svg';

export default function FirstPageButton(props) {
    const disabledButton = <div className="navButton"><img src={disabledFirstIcon} width={30}/></div>;
    const firstPageId = 1;

    let isValidId = ComicPageAPI.validatePageId(firstPageId);
    if(!isValidId || props.pageId==firstPageId) {
        return disabledButton;
    }

    let pageInfo = ComicPageAPI.getPage(firstPageId);

    if(pageInfo) {
        const pageFilePath = '/read/' + firstPageId;
        return(
            <div className="navButton"><Link to={pageFilePath}><img src={activeFirstIcon} width={30}/></Link></div>
        );
    } else {
        return(
            disabledButton
        )
    }
    
}