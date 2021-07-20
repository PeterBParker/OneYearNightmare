import DesktopSupportUsCard from './DesktopSupportUsCard';
import MobileSupportUsCard from './MobileSupportUsCard';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

import supportImage from '../../../assets/Icecream.png';

export default function SupportUsCard() {
    const isDesktop = useMediaQuery({query: querySizes['lg']});
    let supportUsText = "Thank you for reading our comic! It costs about $5 a month to host, and we don't advertise, so consider buying us a frozen custard or supporting us monthly over on Patreon!"
    return (
        isDesktop ? <DesktopSupportUsCard supportUsText={supportUsText} supportImage={supportImage}/> : <MobileSupportUsCard supportUsText={supportUsText} supportImage={supportImage}/>
    )
}