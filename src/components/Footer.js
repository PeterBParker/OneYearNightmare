import MobileFooter from './Footers/MobileFooter';
import DesktopFooter from './Footers/DesktopFooter';

import { useMediaQuery } from 'react-responsive';
import querySizes from '.././styling/breakpoints.json';

export default function Footer() {
    const isTabletOrDesktop = useMediaQuery({query: querySizes['lg']});
    
    let footer = isTabletOrDesktop ? <DesktopFooter /> : <MobileFooter />
    return(
        footer
    ) 
}