import Header from '../../header/Header';
import MobileAboutComic from './aboutCards/MobileAboutComic';
import DesktopAboutComic from './aboutCards/DesktopAboutComic';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

export default function Creators() {
    const isDesktop = useMediaQuery({query: querySizes['lg']});
    return(
        isDesktop?<DesktopAboutComic />:<MobileAboutComic />
    );
}