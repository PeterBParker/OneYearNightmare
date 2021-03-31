import ComicPageAPI from '../../api/ComicPageAPI';
import BackButton from './navigation/BackButton';
import NextButton from './navigation/NextButton';
import MessageBox from './MessageBox';
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
    const pageId = parseInt(params.pageId, 10);

    // Checks the id in the url is a valid page
    let isValidId = ComicPageAPI.validatePageId(pageId);
    if(!isValidId) {
        return (unknownRequestContent);
    }

    var pageInfo  = ComicPageAPI.getPage(pageId);

    if(!pageInfo) {
        return (unknownRequestContent);
    }

    const pageImageUrl = encodeURI(process.env.PUBLIC_URL + BASE_PATH + pageInfo.seasonPath + '/' + pageInfo.chapterPath + '/' + pageInfo.pagePath);

    let title = "One Year Nightmare Page " + pageId;
    const shareImageUrl = DOMAIN + pageImageUrl;
    const sharePageUrl = DOMAIN + "/read/" + params.pageId;
    // TODO 6/10 Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
    return (
        <div>
            <div className="comicImage">
                <img src={pageImageUrl}  alt="test" />
            </div>
            <div className="comicNavButtons">
                <BackButton pageId={pageId}/>
                <NextButton pageId={pageId}/>
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
            <MessageBox pageId={pageId}/>

        </div>

    );
}