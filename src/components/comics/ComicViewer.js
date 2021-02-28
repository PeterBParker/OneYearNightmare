import ComicPageAPI from '../../api/ComicPageAPI';
import BackButton from './navigation/BackButton';
import NextButton from './navigation/NextButton';
import {useParams} from 'react-router-dom';
import {BASE_PATH} from '../Main';

export default function ComicViewer(props) {
    const params = useParams();
    let pageNum = parseInt(params.pageNum);
    // TODO Look into if additional sanitization is needed
    const pageInfo = ComicPageAPI.getPage(parseInt(params.pageNum), params.chapter, params.season);
    
    if (pageInfo == null) {
        return (
            <div>
                <p>No page found. :(</p>
            </div>
        )
    }

    const pageFilePath = BASE_PATH + pageInfo.season + '/' + pageInfo.chapter + '/' + pageInfo.page;
    // TODO Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
    return (
        <div>
            <div className="comicImage">
                <img src={process.env.PUBLIC_URL + pageFilePath} alt="test" />
            </div>
            <div className="comicNavButtons">
                <BackButton /> 
                <NextButton />
            </div>

        </div>

    );
}