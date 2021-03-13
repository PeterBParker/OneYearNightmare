import ComicPageAPI from '../../api/ComicPageAPI';
import BackButton from './navigation/BackButton';
import NextButton from './navigation/NextButton';
import { 
    useParams, 
    Link
 } from 'react-router-dom';
import { 
    BASE_PATH, 
    COMIC_VIEWER_DEFAULT_PATH, 
    DOMAIN 
} from '../Main';
import {
    FacebookShareButton, 
    TwitterShareButton, 
    TumblrShareButton, 
    PinterestShareButton, 
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    TumblrIcon,
    EmailIcon,
} from "react-share";

export default function ComicViewer(props) {
    let unknownRequestContent = <div> <div className="text-3xl our-red">No page found. :(</div> <div>Check out our latest page!</div><div><Link className="p-4 border-2 rounded hover:bg-purple-700 hover:gray-50" to={COMIC_VIEWER_DEFAULT_PATH}>>></Link></div></div>;
    const params = useParams();

    if (!ComicPageAPI.validateParams(params.pageFilename, params.chapterName, params.seasonName)) {
        return (unknownRequestContent);
    }

    const pageNum = ComicPageAPI.getPageNum(params.pageFilename, params.chapterName, params.seasonName);
    var pageInfo = {}
    if (pageNum) {
        pageInfo = ComicPageAPI.getPage(pageNum, params.chapterName, params.seasonName);
    } else {
        return (unknownRequestContent);
    }
    const pageImageUrl = process.env.PUBLIC_URL + BASE_PATH + pageInfo.seasonPath + '/' + pageInfo.chapterPath + '/' + pageInfo.pagePath;

    let title = "Sick Plot Twist";
    const shareImageUrl = DOMAIN + pageImageUrl;
    const sharePageUrl = DOMAIN + "/" + pageInfo.seasonUrl + '/' + pageInfo.chapterUrl + '/' + pageInfo.pageUrl;
    // TODO 6/10 Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
    return (
        <div>
            <div className="comicImage">
                <img src={pageImageUrl}  alt="test" />
            </div>
            <div className="comicNavButtons">
                <BackButton />
                <NextButton />
            </div>
            <div className="socialShareContainer">
                <div className="facebookShareContainer">
                    <FacebookShareButton url={sharePageUrl} quote={title} > 
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </div>
                <div className="twitterShareContainer">
                    <TwitterShareButton url={sharePageUrl} title={title}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                </div>
                <div className="tumblrShareContainer">
                    <TumblrShareButton url={sharePageUrl} title={title}>
                        <TumblrIcon size={32} round />
                    </TumblrShareButton>
                </div>
                <div className="pinterestShareContainer">
                    <PinterestShareButton url={sharePageUrl} media={shareImageUrl}>
                        <PinterestIcon size={32} round />
                    </PinterestShareButton>
                </div>
                <div className="emailShareContainer">
                    <EmailShareButton url={sharePageUrl} subject={title} body="body">
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </div>
            </div>

        </div>

    );
}