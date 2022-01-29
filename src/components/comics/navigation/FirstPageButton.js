import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeFirstIcon from '../../../assets/FINAL-ASSETS-072821/final assets/left-skip-30px.png';
import disabledFirstIcon from '../../../assets/FINAL-ASSETS-072821/final assets/left-skip-light-30px.png';

export default function FirstPageButton(props) {
    const disabledButton = <div className="navButton"><img src={disabledFirstIcon} width={30} alt="disabled navigation first page button"/></div>;
    const firstPageId = 1;

    let isValidId = ComicPageAPI.validatePageId(firstPageId);
    if(!isValidId || props.pageId===firstPageId) {
        return disabledButton;
    }

    let pageInfo = ComicPageAPI.getPage(firstPageId);

    if(pageInfo) {
        const pageFilePath = '/read/' + firstPageId;
        return(
            <div className="navButton" onClick={props.scrollToTopOfPage}><Link to={pageFilePath}><img src={activeFirstIcon} width={30} alt="enabled navigation first page button"/></Link></div>
        );
    } else {
        return(
            disabledButton
        )
    }
    
}