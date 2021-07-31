import DesktopSupportUsCard from './DesktopSupportUsCard';
import MobileSupportUsCard from './MobileSupportUsCard';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

import supportImage from '../../../assets/Icecream.png';
import patreon50 from '../../../assets/Phase4-Assets1/2x/NEW_ICONS/fill-patreon-50px.png';
import patreon50color from '../../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-patreon-50px.png'
import tip50 from '../../../assets/Phase4-Assets1/2x/NEW_ICONS/fill-custard-50px.png'
import tip50color from '../../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-custard-50px.png'
import discordIcon from '../../../assets/Phase4-Assets1/2x/NEW_ICONS/fill-discord-50px.png'
import { useState } from 'react';

export default function SupportUsCard() {
    let [patreonIcon, setPatreonIcon] = useState(patreon50);
    let [tipIcon, setTipIcon] = useState(tip50);

    function handlePatreonIcon(newIcon) {
        setPatreonIcon(newIcon);
    }
    function handleTipIcon(newIcon) {
        setTipIcon(newIcon)
    }

    const isDesktop = useMediaQuery({query: querySizes['lg']});
    let supportUsText = <>Thank you for reading our comic! It costs about $5 a month to host, and we don't advertise, so consider buying us a frozen custard, supporting us monthly over on Patreon, or even joining our <p className="font-medium italic inline">free</p> discord server to be notified when the next page drops!</>
    return (
        isDesktop ? 
            <DesktopSupportUsCard supportUsText={supportUsText} supportImage={supportImage} 
                patreonIcon={patreonIcon} patreonActive={patreon50color} patreonInactive={patreon50} 
                tipIcon={tipIcon} tipActive={tip50color} tipInactive={tip50}
                changePatreon={handlePatreonIcon} changeTip={handleTipIcon}/> 
        : 
            <MobileSupportUsCard supportUsText={supportUsText} supportImage={supportImage} 
                patreonIcon={patreonIcon} patreonActive={patreon50color} patreonInactive={patreon50} 
                tipIcon={tipIcon} tipActive={tip50color} tipInactive={tip50}
                changePatreon={handlePatreonIcon} changeTip={handleTipIcon}
                discordIcon={discordIcon}/>
    )
}