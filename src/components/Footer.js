import MobileFooter from './footers/MobileFooter';
import DesktopFooter from './footers/DesktopFooter';

import { useMediaQuery } from 'react-responsive';
import querySizes from '.././styling/breakpoints.json';

export default function Footer() {
    const isTabletOrDesktop = useMediaQuery({query: querySizes['lg']});
    
    let footer = isTabletOrDesktop ? <DesktopFooter /> : <MobileFooter />
    return(
        footer
    ) 
}