import ComicPageAPI from '../../api/ComicPageAPI';
import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavBar from './navigation/desktop/DesktopNavBar';
import DesktopReadPageCards from './ReadPageCards/DesktopReadPageCards';
import MobileReadPageCards from './ReadPageCards/MobileReadPageCards';
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
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';

export default function ComicViewer(props) {
    const isDesktop = useMediaQuery({query: querySizes['lg']});

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
            <div className="comicImage bg-cream-dark">
                <img src={pageImageUrl} alt="test" className="ml-auto mr-auto"/>
            </div>

            {isDesktop ? <DesktopNavBar pageId={pageId} /> : <MobileNavBar pageId={pageId} />}

            <div className="socialShareContainer my-3">
                <div className="text-center text-mocha-light font-body font-semibold">
                    <div>share this comic:</div>
                </div>
                <div className="socialShareButtonContainer flex flex-row justify-center w-full px-4 mt-3">
                    <div className="facebookShareContainer flex-grow-0 mx-3">
                        <FacebookShareButton url={sharePageUrl} quote={title} >
                            <img src={fbSvg} width={32} />
                        </FacebookShareButton>
                    </div>
                    <div className="twitterShareContainer flex-grow-0 mx-3">
                        <TwitterShareButton url={sharePageUrl} title={title}>
                            <img src={twitterSvg} width={32} />
                        </TwitterShareButton>
                    </div>
                    <div className="tumblrShareContainer flex-grow-0 mx-3">
                        <TumblrShareButton url={sharePageUrl} title={title}>
                            <img src={tumblrSvg} width={32} />
                        </TumblrShareButton>
                    </div>
                    <div className="pinterestShareContainer flex-grow-0 mx-3">
                        <PinterestShareButton url={sharePageUrl} media={shareImageUrl}>
                            <img src={pinterestSvg} width={32} />
                        </PinterestShareButton>
                    </div>
                    <div className="emailShareContainer flex-grow-0 mx-3">
                        <EmailShareButton url={sharePageUrl} subject={title} body="body">
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                    </div>
                </div>
            </div>
            {isDesktop ? <DesktopReadPageCards pageId={pageId} /> : <MobileReadPageCards pageId={pageId} />}
        </div>

    );
}