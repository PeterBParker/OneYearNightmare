import ComicPageAPI from '../../api/ComicPageAPI';
import MobileNavBar from './navigation/MobileNavBar';
import PageDetailsCard from './PageDetailsCard';
import SupportUsCard from '../generic/SupportUsCard';
import Header from '../Header';
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
import fbSvg from '../../assets/Website Assets - Phase 1/SVG/SM-fb.svg';
import twitterSvg from '../../assets/Website Assets - Phase 1/SVG/SM-twitter.svg';
import tumblrSvg from '../../assets/Website Assets - Phase 1/SVG/SM-tumblr.svg';
import pinterestSvg from '../../assets/Website Assets - Phase 1/SVG/SM-pinterest.svg';


export default function ComicViewer(props) {
    let unknownRequestContent = <div> <div className="text-3xl our-red">No page found. :(</div> <div>Check out our latest page!</div><div><Link className="p-4 border-2 rounded hover:bg-purple-700 hover:gray-50" to={COMIC_VIEWER_DEFAULT_PATH}>>></Link></div></div>;
    const params = useParams();
    const pageId = parseInt(params.pageId, 10);

    // Checks the id in the url is a valid page
    let isValidId = ComicPageAPI.validatePageId(pageId);
    if (!isValidId) {
        return (unknownRequestContent);
    }

    var pageInfo = ComicPageAPI.getPage(pageId);
    if (!pageInfo) {
        return (unknownRequestContent);
    }

    const pageImageUrl = encodeURI(process.env.PUBLIC_URL + BASE_PATH + pageInfo.seasonPath + '/' + pageInfo.chapterPath + '/' + pageInfo.pagePath);
    let title = "One Year Nightmare Page " + pageId;
    const shareImageUrl = DOMAIN + pageImageUrl;
    const sharePageUrl = DOMAIN + "/read/" + params.pageId;
    // TODO 6/10 Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
    return (
        <div>
            <Header defaultBg={false}/>
            <div className="comicImage">
                <img src={pageImageUrl} alt="test" />
            </div>
            <MobileNavBar pageId={pageId} />
            <div className="socialShareContainer my-3">
                <div className="text-center text-mocha-light font-body font-semibold">
                    <div>share this comic:</div>
                </div>
                <div className="socialShareButtonContainer flex flex-row w-full px-4 mt-3">
                    <div className="facebookShareContainer flex-grow">
                        <FacebookShareButton url={sharePageUrl} quote={title} >
                            <img src={fbSvg} width={32} />
                        </FacebookShareButton>
                    </div>
                    <div className="twitterShareContainer flex-grow">
                        <TwitterShareButton url={sharePageUrl} title={title}>
                            <img src={twitterSvg} width={32} />
                        </TwitterShareButton>
                    </div>
                    <div className="tumblrShareContainer flex-grow">
                        <TumblrShareButton url={sharePageUrl} title={title}>
                            <img src={tumblrSvg} width={32} />
                        </TumblrShareButton>
                    </div>
                    <div className="pinterestShareContainer flex-grow">
                        <PinterestShareButton url={sharePageUrl} media={shareImageUrl}>
                            <img src={pinterestSvg} width={32} />
                        </PinterestShareButton>
                    </div>
                    <div className="emailShareContainer flex-grow">
                        <EmailShareButton url={sharePageUrl} subject={title} body="body">
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                    </div>
                </div>
            </div>

            <PageDetailsCard pageId={pageId} />
            <SupportUsCard />
        </div>

    );
}