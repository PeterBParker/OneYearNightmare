import ComicPageAPI from '../../api/ComicPageAPI';
import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavBar from './navigation/desktop/DesktopNavBar';
import DesktopReadPageCards from './ReadPageCards/DesktopReadPageCards';
import MobileReadPageCards from './ReadPageCards/MobileReadPageCards';
import Header from '../header/Header';
import {
    useParams,
    Link
} from 'react-router-dom';
import {
    BASE_PATH,
    COMIC_VIEWER_DEFAULT_PATH,
    DOMAIN
} from '../Main';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';
import SocialMediaShareButtons from './SocialMediaShareButtons';

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
            <div className={`${isDesktop ? "desktopComicPageContainer " : "mobileComicPageContainer bg-cream-dark"}`}>
                <img src={pageImageUrl} alt="test" className="ml-auto mr-auto"/>
            </div>

            {isDesktop ? <DesktopNavBar pageId={pageId} /> : <MobileNavBar pageId={pageId} />}

            <div className="socialShareContainer my-3">
                <div className="text-center text-mocha-light font-body font-semibold">
                    <div>share this comic:</div>
                </div>
                <SocialMediaShareButtons sharePageUrl={sharePageUrl} shareImageUrl={shareImageUrl} title={title} />
            </div>
            {isDesktop ? <DesktopReadPageCards pageId={pageId} /> : <MobileReadPageCards pageId={pageId} />}
        </div>

    );
}