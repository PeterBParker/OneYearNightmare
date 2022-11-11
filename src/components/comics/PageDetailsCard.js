import ComicPageAPI from '../../api/ComicPageAPI';
import DesktopPageDetailsCard from '../PageDetailCards/DesktopPageDetailsCard';
import MobilePageDetailsCard from '../PageDetailCards/MobilePageDetailsCard';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';

export default function PageDetailsCard(props) {
    const isDesktop = useMediaQuery({query: querySizes['lg']});

    let date = new Date(props.page.datetime)
    let volNum = String(props.chapter.id-1).padStart(2, '0');
    let pageNum = String(props.page.pageNum).padStart(2, '0');
    let title = "Chap. " + volNum + " // Pg " + pageNum;

    return (
        isDesktop ? 
            <DesktopPageDetailsCard page={props.page} date={date} title={title} /> 
        : 
            <MobilePageDetailsCard page={props.page} date={props.page.datetime} title={title} />
    )
}