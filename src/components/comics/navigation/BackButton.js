import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import {BASE_PATH} from '../../Main';
import {useParams} from 'react-router-dom';

export default function BackButton() {
    const params = useParams();
    const emptyDiv = <div className="backButton"></div>;
    const backPageId = parseInt(params.pageId, 10)-1;

    let isValidId = ComicPageAPI.validatePageId(backPageId);
    if(!isValidId) {
        return emptyDiv;
    }

    let pageInfo = ComicPageAPI.getPage(backPageId);

    if(pageInfo) {
        const pageFilePath = '/read/' + backPageId;
        return(
            <div className="backButton"><Link to={pageFilePath}>Back</Link></div>
        );
    } else {
        return(
            <div className="backButton"></div>
        )
    }
    
}