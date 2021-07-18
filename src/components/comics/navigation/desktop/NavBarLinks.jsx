import { Link } from 'react-router-dom';

export default function NavBarLinks() {
    return ([
            <div className="text-grey-light mr-3 font-medium desktopNavLink">
                <Link to={'/read/'}>read</Link>
            </div>,
            <div className="text-grey-light mr-3 font-medium desktopNavLink">
                <Link to={'/creatives'}>about</Link>
            </div>,
            <span className="text-grey-light font-medium desktopNavLink">
                <Link to={'/support'}>support</Link>
            </span>
            ]
    )
}