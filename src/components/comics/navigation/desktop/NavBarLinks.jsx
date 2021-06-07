import { Link } from 'react-router-dom';

export default function NavBarLinks() {
    return (
        <div className="navBarLinksContainer text-2xl font-body font-medium mx-6 flex flex-row justify-end">
            <div className="text-mocha-dark mr-3 desktopNavLink">
                <Link to={'/read/'}>read</Link>
            </div>
            <div className="text-mocha-dark mr-3 desktopNavLink">
                <Link to={'/creatives'}>about</Link>
            </div>
            <span className="text-mocha-dark desktopNavLink">
                <Link to={'/support'}>support</Link>
            </span>
        </div>
    )
}