import MobileFooter from './footers/MobileFooter';
import DesktopFooter from './footers/DesktopFooter';

import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import querySizes from '.././styling/breakpoints.json';

import facebookInactive from '../assets/New-Icons_New-Nav/2x/NEW ICONS/line-FB-50px.png';
import facebookActive from '../assets/New-Icons_New-Nav/2x/NEW ICONS/color-line-FB-50px.png';
import instagramInactive from '../assets/New-Icons_New-Nav/2x/NEW ICONS/line-IG-50px.png';
import instagramActive from '../assets/New-Icons_New-Nav/2x/NEW ICONS/color-line-IG-50px.png';
import twitterInactive from '../assets/New-Icons_New-Nav/2x/NEW ICONS/line-twitter-50px.png';
import twitterActive from '../assets/New-Icons_New-Nav/2x/NEW ICONS/color-line-twitter-50px.png';

import facebookIcon32 from '../assets/New-Icons_New-Nav/2x/NEW ICONS/line-FB-32px.png';
import instagramIcon32 from '../assets/New-Icons_New-Nav/2x/NEW ICONS/line-IG-32px.png';
import twitterIcon32 from '../assets/New-Icons_New-Nav/2x/NEW ICONS/line-twitter32px.png';

export default function Footer() {
    const isTabletOrDesktop = useMediaQuery({query: querySizes['lg']});
    let [facebookIcon, setFacebookIcon] = useState(facebookInactive);
    let [instagramIcon, setInstagramIcon] = useState(instagramInactive);
    let [twitterIcon, setTwitterIcon] = useState(twitterInactive);
    
    function changeIcon(platform, newIcon) {
        if (platform === "fb") {
            setFacebookIcon(newIcon);
        } else if (platform === 'insta') {
            setInstagramIcon(newIcon);
        } else if (platform === 'twitter') {
            setTwitterIcon(newIcon);
        }
    }

    return(
        isTabletOrDesktop ? 
            <DesktopFooter facebookIcon={facebookIcon} instagramIcon={instagramIcon} twitterIcon={twitterIcon}
                facebookActive={facebookActive} facebookInactive={facebookInactive}
                instagramActive={instagramActive} instagramInactive={instagramInactive}
                twitterActive={twitterActive} twitterInactive={twitterInactive}
                changeIcon={changeIcon}/> 
        : 
            <MobileFooter facebookIcon={facebookIcon32} instagramIcon={instagramIcon32} twitterIcon={twitterIcon32}/>
    ) 
}