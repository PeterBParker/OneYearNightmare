import {Link} from 'react-router-dom';
import ComicViewer from './comics/ComicViewer';
import Creators from './creators/Creators';
import Support from './creators/Support';

export default function Header() {
    return (
        <div>
            <div class="navbar">
                <div class="comicViewerNavLink">
                    <Link to='/'>Read</Link>
                </div>
                <div class="creatorsNavLink">
                    <Link to='/creatives'>About Us</Link>
                </div>
                <div class="supportNavLink">
                    <Link to='/support'>Support Us</Link>
                </div>
            </div>
        </div>
    );
}