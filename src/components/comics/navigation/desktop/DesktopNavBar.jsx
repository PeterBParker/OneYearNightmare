import PageNavButtons from '../PageNavButtons';
import logo from '../../../../assets/Website Assets - Phase 1/SVG_min/LOGO-navbar.svg';
import NavBarLinks from './NavBarLinks';

export default function DesktopNavBar(props) {

    return (
        <div className="desktopNavBarContainer flex flex-row justify-between bg-cream-light px-8 items-center">
            <div className="desktopNavLogo">
                <img src={logo} width='275px' />
            </div>
            <div className="desktopNavButtons">
                <PageNavButtons pageId={props.pageId} />
            </div>
            <div className="desktopNavLinks">
                <NavBarLinks />
            </div>
        </div>
    );
}