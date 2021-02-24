import {Link} from 'react-router-dom';
import {COMIC_VIEWER_DEFAULT_PATH} from './Main';

export default function Header() {
    return (
        <div>
            <div className="navbar">
                <div className="comicViewerNavLink">
                    <Link to={COMIC_VIEWER_DEFAULT_PATH}>Read</Link>
                </div>
                <div className="creatorsNavLink">
                    <Link to='/creatives'>About Us</Link>
                </div>
                <div className="supportNavLink">
                    <Link to='/support'>Support Us</Link>
                </div>
            </div>
        </div>
    );
}