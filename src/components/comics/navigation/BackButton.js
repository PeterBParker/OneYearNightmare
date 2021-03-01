import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import {BASE_PATH} from '../../Main';
import {useParams} from 'react-router-dom';

export default function BackButton() {
    const params = useParams();
    const pageNum = ComicPageAPI.getPageNum(params.pageFilename, params.chapterName, params.seasonName);
    var pageInfo = {};
    if(pageNum) {
        pageInfo = ComicPageAPI.getPrevPage(pageNum, params.chapterName, params.seasonName);
    }
    
    if(pageInfo) {
        const pageFilePath = '/read/' + pageInfo.season + '/' + pageInfo.chapter + '/' + pageInfo.page;
        return(
            <div className="backButton"><Link to={pageFilePath}>Back</Link></div>
        );
    } else {
        return(
            <div className="backButton"></div>
        )
    }
    
}