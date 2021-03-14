import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import {BASE_PATH} from '../../Main';
import {useParams} from 'react-router-dom';

export default function NextButton(props) {
    const emptyDiv = <div className="nextButton"></div>;
    const nextPageId = props.pageId+1;

    let isValidId = ComicPageAPI.validatePageId(nextPageId);
    if(!isValidId) {
        return emptyDiv;
    }

    const pageInfo = ComicPageAPI.getPage(nextPageId);

    if(pageInfo) {
        const pageFilePath = '/read/' + nextPageId;
        return(
            <div className="nextButton"><Link to={pageFilePath}>Next</Link></div>
        );
    } else {
        return(emptyDiv);
    }
    
}