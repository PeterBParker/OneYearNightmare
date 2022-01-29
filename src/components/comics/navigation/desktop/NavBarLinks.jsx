import { Link } from 'react-router-dom';
import Pages from './Pages';
export default function NavBarLinks(props) {
    return ([
            <div className={`${props.page.name === Pages.ABOUT.name ? 'desktopNavLinkSelected' : 'desktopNavLink'} text-grey-light mr-8 font-medium `} key="aboutNavBarLink">
                <Link to={'/creatives'}>about</Link>
            </div>,
            <div className={`${props.page.name === Pages.READ.name ? 'desktopNavLinkSelected' : 'desktopNavLink'} text-grey-light mr-8 font-medium `} key="readNavBarLink">
                <Link to={'/read/'}>read</Link>
            </div>,
            <div className={`${props.page.name === Pages.SUPPORT.name ? 'desktopNavLinkSelected' : 'desktopNavLink'} text-grey-light mr-8 font-medium `} key="supportNavBarLink">
                <Link to={'/support'}>support</Link>
            </div>,
            <span className={`${props.page.name === Pages.ARCHIVE.name ? 'desktopNavLinkSelected' : 'desktopNavLink' } text-grey-light font-medium `} key="archiveNavBarLink">
                <Link to={'/archive'}>archive</Link>
            </span>
            ]
    )
}