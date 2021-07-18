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
        <div className="desktopNavBarContainer flex flex-row justify-between bg-white px-8 items-center mx-auto">
            <div className="desktopNavButtons">
                {middleButtons}
            </div>
        </div>
    );
}