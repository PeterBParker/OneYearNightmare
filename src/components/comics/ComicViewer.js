import ComicPageAPI from '../../api/ComicPageAPI';
import BackButton from './navigation/BackButton';
import NextButton from './navigation/NextButton';
import {useParams} from 'react-router-dom';
import {BASE_PATH} from '../Main';

export default function ComicViewer() {
    let unknownRequestContent = <div> <div className="text-3xl our-red">No page found. :(</div></div>;
    const params = useParams();

    console.log("This is the seasonName", params)
    if(!ComicPageAPI.validateParams(params.pageFilename, params.chapterName, params.seasonName)){
        return (unknownRequestContent);
    }

    const pageNum = ComicPageAPI.getPageNum(params.pageFilename, params.chapterName, params.seasonName);
    console.log("This is pageNum", pageNum)
    var pageInfo = {}
    if(pageNum) {
        pageInfo = ComicPageAPI.getPage(pageNum, params.chapterName, params.seasonName);
    } else {
        return (unknownRequestContent);
    }

    const pageFilePath = BASE_PATH + pageInfo.season + '/' + pageInfo.chapter + '/' + pageInfo.page;
    // TODO 6/10 Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
    return (
        <div>
            <div className="comicImage">
                <img src={process.env.PUBLIC_URL + pageFilePath} onContextMenu={(e)=> e.preventDefault()} alt="test" />
            </div>
            <div className="comicNavButtons">
                <BackButton />
                <NextButton />
            </div>

        </div>

    );
}