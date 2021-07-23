import { Link } from 'react-router-dom';
import Pages from './Pages';
export default function NavBarLinks(props) {
    return ([
            <div className={`${props.page.name == Pages.ABOUT.name ? 'desktopNavLinkSelected' : 'desktopNavLink'} text-grey-light mr-8 font-medium `}>
                <Link to={'/creatives'}>about</Link>
            </div>,
            <div className={`${props.page.name == Pages.READ.name ? 'desktopNavLinkSelected' : 'desktopNavLink'} text-grey-light mr-8 font-medium `}>
                <Link to={'/read/'}>read</Link>
            </div>,
            <span className={`${props.page.name == Pages.SUPPORT.name ? 'desktopNavLinkSelected' : 'desktopNavLink'} text-grey-light font-medium `}>
                <Link to={'/support'}>support</Link>
            </span>
            ]
    )
}