import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeNextIcon from '../../../assets/Website Assets - Phase 1/SVG/NAVBAR-next.svg';
import disabledNextIcon from '../../../assets/Website Assets - Phase 1/SVG/NAVBAR-next-disabled.svg';

export default function NextButton(props) {
    const disabledButton = <div className="navButton"><img src={disabledNextIcon} width={30} /></div>;
    const nextPageId = props.pageId+1;

    let isValidId = ComicPageAPI.validatePageId(nextPageId);
    if(!isValidId) {
        return disabledButton;
    }

    const pageInfo = ComicPageAPI.getPage(nextPageId);
    if(pageInfo) {
        const pageFilePath = '/read/' + nextPageId;
        return(
            <div className="navButton"><Link to={pageFilePath}><img src={activeNextIcon} width={30}/></Link></div>
        );
    } else {
        return(
            {disabledButton}
        );
    }
    
}