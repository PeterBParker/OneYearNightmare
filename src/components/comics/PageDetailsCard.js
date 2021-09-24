import ComicPageAPI from '../../api/ComicPageAPI';
import DesktopPageDetailsCard from '../PageDetailCards/DesktopPageDetailsCard';
import MobilePageDetailsCard from '../PageDetailCards/MobilePageDetailsCard';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';

export default function PageDetailsCard(props) {
    const isDesktop = useMediaQuery({query: querySizes['lg']});

    let page = ComicPageAPI.getPageObj(props.pageId)
    let date = new Date(page.datetime)
    let volNum = String(ComicPageAPI.getSeasonNum(props.pageId)).padStart(2, '0');
    let pageNum = String(page.pageNum).padStart(2, '0');
    let title = "Vol " + volNum + " // Pg " + pageNum;

    return (
        isDesktop ? 
            <DesktopPageDetailsCard page={page} date={date} title={title} /> 
        : 
            <MobilePageDetailsCard page={page} date={page.datetime} title={title} />
    )
}