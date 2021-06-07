import PageNavButtons from '../PageNavButtons';
import NavBarLogo from '../../../svgs/NavBarLogo';
import NavBarLinks from './NavBarLinks';

export default function DesktopNavBar(props) {

    return (
        <div className="desktopNavBarContainer flex flex-row justify-between bg-cream-light px-8 items-center">
            <div className="desktopNavLogo">
                <NavBarLogo color={'#998f7e'} />
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