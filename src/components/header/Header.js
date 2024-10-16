import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';
import SimpleNavBar from '../comics/navigation/desktop/SimpleNavBar';


export default function Header(props) {
    const isDesktop = useMediaQuery({query: querySizes['lg']});

    return (
        <>
            {isDesktop ? <DesktopHeader {...props} /> : <MobileHeader {...props} />}
            {isDesktop ? <SimpleNavBar /> : ""}
        </>
    );
}