import DesktopPageDetailsCard from '../PageDetailCards/DesktopPageDetailsCard';
import MobilePageDetailsCard from '../PageDetailCards/MobilePageDetailsCard';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';

export default function PageDetailsCard(props) {
    const isDesktop = useMediaQuery({query: querySizes['lg']});

    const card = isDesktop ? <DesktopPageDetailsCard pageId={props.pageId} /> : <MobilePageDetailsCard pageId={props.pageId} />;
    return (
        card
    )
}