import SupportMobile from './SupportMobile';
import SupportDesktop from './SupportDesktop';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

export default function Support() {
    const isTabletOrDesktop = useMediaQuery({query: querySizes['lg']});
    
    let support = isTabletOrDesktop ? <SupportDesktop /> : <SupportMobile />

    return(
        support
    );
}