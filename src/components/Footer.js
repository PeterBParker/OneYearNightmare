import MobileFooter from './footers/MobileFooter';
import DesktopFooter from './footers/DesktopFooter';

import { useMediaQuery } from 'react-responsive';
import querySizes from '.././styling/breakpoints.json';

import facebookIcon from '../assets/Phase3-Assets1/1x/32x-footer-FB.png';
import instagramIcon from '../assets/Phase3-Assets1/1x/32x-footer-IG.png';
import twitterIcon from '../assets/Phase3-Assets1/1x/32x-footer-twitter.png';

export default function Footer() {
    const isTabletOrDesktop = useMediaQuery({query: querySizes['lg']});
    
    return(
        isTabletOrDesktop ? 
            <DesktopFooter facebookIcon={facebookIcon} instagramIcon={instagramIcon} twitterIcon={twitterIcon}/> 
        : 
            <MobileFooter facebookIcon={facebookIcon} instagramIcon={instagramIcon} twitterIcon={twitterIcon}/>
    ) 
}