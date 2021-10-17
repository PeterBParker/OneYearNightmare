import ComicPageAPI from '../../api/ComicPageAPI';
import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavBar from './navigation/desktop/DesktopNavBar';
import DesktopReadPageCards from './ComicViewerCards/DesktopReadPageCards';
import MobileReadPageCards from './ComicViewerCards/MobileReadPageCards';
import DesktopPageView from './ComicViewerCards/DesktopPageView';
import MobilePageView from './ComicViewerCards/MobilePageView';
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
import Pages from './navigation/desktop/Pages';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';
import HorizontalShare from './HorizontalShare';
import SimpleNavBar from '../comics/navigation/desktop/SimpleNavBar';
import { useRef } from 'react';

export default function ComicViewer(props) {
    const isDesktop = useMediaQuery({query: querySizes['lg']});
    const topOfPageRef = useRef(null);

    const scrollToTopOfPage = () => topOfPageRef.current.scrollIntoView({behavior: 'smooth'});

    let unknownRequestContent = <div className="invalidComicPage"> 
                                    <div className="text-3xl our-red ">No page found. :(</div> 
                                    <div>Check out our latest page!</div>
                                    <div className="mt-10">
                                        <Link className="p-4 border-2 rounded hover:bg-purple-700 hover:gray-50" to={COMIC_VIEWER_DEFAULT_PATH}>>></Link>
                                    </div>
                                </div>;
    const params = useParams();
    const pageId = parseInt(params.pageId, 10);

    // Checks the id in the url is a valid page
    let isValidId = ComicPageAPI.validatePageId(pageId);
    if (!isValidId) {
        return (<div className={`${isDesktop ? "comicViewerDesktop" : ''} pb-24`}>
        <Header defaultBg={false}/>
        {isDesktop ? <SimpleNavBar page={Pages.READ}/> : ''}
        {unknownRequestContent}
        
        </div>);
    }

    var pageInfo = ComicPageAPI.getPage(pageId);
    if (!pageInfo) {
        return (<div className={`${isDesktop ? "comicViewerDesktop" : ''} pb-24`}>
        <Header defaultBg={false}/>
        {isDesktop ? <SimpleNavBar page={Pages.READ}/> : ''}
        {unknownRequestContent}
        </div>);
    }

    const pageImageUrl = encodeURI(process.env.PUBLIC_URL + BASE_PATH + pageInfo.seasonPath + '/' + pageInfo.chapterPath + '/' + pageInfo.pagePath);
    let title = "One Year Nightmare Page " + pageId;
    const shareImageUrl = DOMAIN + pageImageUrl;
    const sharePageUrl = DOMAIN + "/read/" + params.pageId;
    // TODO 6/10 Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
   
    return (
        <div className={`${isDesktop ? "comicViewerDesktop desktopBg pb-24" : 'pb-16'}`}>
            <Header defaultBg={false}/>
            {isDesktop ? <SimpleNavBar page={Pages.READ}/> : ''}
            {isDesktop ? <DesktopPageView pageImageUrl={pageImageUrl} sharePageUrl={sharePageUrl} title={title} topOfPageRef={topOfPageRef}/> : <MobilePageView pageImageUrl={pageImageUrl} topOfPageRef={topOfPageRef}/>}

            {isDesktop ? <DesktopNavBar pageId={pageId} scrollToTopOfPage={scrollToTopOfPage}/> : <MobileNavBar pageId={pageId} scrollToTopOfPage={scrollToTopOfPage}/>}
            {isDesktop ? '' : <HorizontalShare sharePageUrl={sharePageUrl} shareImageUrl={shareImageUrl} title={title} />}
            {isDesktop ? <DesktopReadPageCards pageId={pageId} /> : <MobileReadPageCards pageId={pageId} />}
        </div>

    );
}