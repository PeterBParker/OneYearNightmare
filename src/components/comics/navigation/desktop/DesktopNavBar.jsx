import PageNavButtons from '../PageNavButtons';
import logo from '../../../../assets/Website Assets - Phase 1/SVG_min/LOGO-navbar.svg';
import NavBarLinks from './NavBarLinks';

export default function DesktopNavBar(props) {
    let middleButtons = null
    if (props.pageId) {
        middleButtons = <PageNavButtons pageId={props.pageId} />
    } else {
        middleButtons = ''
    }
    return (
        <div className="desktopNavBarContainer flex flex-row justify-between bg-cream-light px-8 items-center">
            <div className="desktopNavLogo">
                <img src={logo} width='275px' />
            </div>
            <div className="desktopNavButtons">
                {middleButtons}
            </div>
            <div className="desktopNavLinks text-2xl font-body font-medium mx-6 flex flex-row justify-end">
                <NavBarLinks />
            </div>
        </div>
    );
}