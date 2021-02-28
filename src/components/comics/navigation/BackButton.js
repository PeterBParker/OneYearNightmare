import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import {BASE_PATH} from '../../Main';
import {useParams} from 'react-router-dom';

export default function BackButton() {
    const params = useParams();
    console.log("this is params", params);
    const pageInfo = ComicPageAPI.getPrevPage(parseInt(params.pageNum, 10), params.chapter, params.season);
    console.log("This is the pageInfo: ", pageInfo);
    if(pageInfo) {
        const pageFilePath = '/read/' + pageInfo.season + '/' + pageInfo.chapter + '/' + pageInfo.page;
        return(
            <div className="nextButton"><Link to={pageFilePath}>Back</Link></div>
        );
    } else {
        return(
            <div className="nextButton"></div>
        )
    }
    
}