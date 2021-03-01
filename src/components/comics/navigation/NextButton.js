import ComicPageAPI from '../../../api/ComicPageAPI';
import {Link} from 'react-router-dom';
import {BASE_PATH} from '../../Main';
import {useParams} from 'react-router-dom';

export default function NextButton() {
    const params = useParams();
    const pageNum = ComicPageAPI.getPageNum(params.pageFilename, params.chapterName, params.seasonName);
    let pageInfo = {}
    if(pageNum) {
        pageInfo = ComicPageAPI.getNextPage(pageNum, params.chapterName, params.seasonName);
    }
    if(pageInfo) {
        const pageFilePath = '/read/' + pageInfo.season + '/' + pageInfo.chapter + '/' + pageInfo.page;
        return(
            <div className="nextButton"><Link to={pageFilePath}>Next</Link></div>
        );
    } else {
        return(
            <div className="nextButton"></div>
        )
    }
    
}