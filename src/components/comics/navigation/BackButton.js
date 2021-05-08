import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeBackIcon from '../../../assets/Website Assets - Phase 1/SVG/NAVBAR-previous.svg';
import disabledBackIcon from '../../../assets/Website Assets - Phase 1/SVG/NAVBAR-previous-disabled.svg';

export default function BackButton(props) {
    const disabledButton = <div className="navButton"><img src={disabledBackIcon} width={30}/></div>;
    const backPageId = props.pageId-1;

    let isValidId = ComicPageAPI.validatePageId(backPageId);
    if(!isValidId) {
        return disabledButton;
    }

    let pageInfo = ComicPageAPI.getPage(backPageId);

    if(pageInfo) {
        const pageFilePath = '/read/' + backPageId;
        return(
            <div className="navButton"><Link to={pageFilePath}><img src={activeBackIcon} width={30}/></Link></div>
        );
    } else {
        return(
            disabledButton
        )
    }
    
}