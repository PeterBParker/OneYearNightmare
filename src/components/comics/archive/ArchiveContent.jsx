import CardHeader from "../../generic/CardHeader"

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

export default function ArchiveContent(props) {
    const isTabletOrDesktop = useMediaQuery({query: querySizes['lg']});

    return(
        <div className={`archiveContent mx-auto mt-4 mb-12 ${isTabletOrDesktop ? "desktopCard" : ""}`}>
            <CardHeader isDesktop={isTabletOrDesktop} text="Archive"/>
        </div>
    )
}