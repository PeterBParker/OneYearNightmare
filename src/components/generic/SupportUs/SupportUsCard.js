import DesktopSupportUsCard from './DesktopSupportUsCard';
import MobileSupportUsCard from './MobileSupportUsCard';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

export default function SupportUsCard() {
    const isDesktop = useMediaQuery({query: querySizes['lg']});
    const support = isDesktop ? <DesktopSupportUsCard /> : <MobileSupportUsCard />;
    return (
        support
    )
}