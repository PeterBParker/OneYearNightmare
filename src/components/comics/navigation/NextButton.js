import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import activeNextIcon from '../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-30px.png';
import disabledNextIcon from '../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-light-30px.png';

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