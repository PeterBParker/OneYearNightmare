import ArchiveMobile from './ArchiveMobile';
import ArchiveDesktop from './ArchiveDesktop';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

export default function Archive() {
    const isTabletOrDesktop = useMediaQuery({query: querySizes['lg']});

    return(
        isTabletOrDesktop ? <ArchiveDesktop /> : <ArchiveMobile />
    );
}