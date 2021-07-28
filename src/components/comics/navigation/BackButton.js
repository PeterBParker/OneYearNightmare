import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeBackIcon from '../../../assets/FINAL-ASSETS-072821/final assets/left-arrow-30px.png';
import disabledBackIcon from '../../../assets/FINAL-ASSETS-072821/final assets/left-arrow-light-30px.png';

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