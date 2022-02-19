import {Switch, Route} from 'react-router-dom';
import Archive from './comics/archive/Archive';
import ComicRouter from './comics/ComicRouter';
import Creators from './creators/about/Creators';
import Support from './creators/supportUsCards/Support';
import Home from './Home';

export const DOMAIN = 'https://monstersandmyriads.com';
export const BASE_PATH = '/MnMPages/';
export const JOINT_SIG = 'Mo and Nate';


export const COMIC_VIEWER_DEFAULT_PATH = '/read/1';
export const COMIC_VIEWER_PATH = '/read';
export const SUPPORT_PAGE_PATH = '/support';
export const ARCHIVE_PAGE_PATH = '/archive';
export const CREATIVES_PAGE_PATH = '/creatives';

export const SNAP_TO_PAGE_PATH = 'snap-to-page';

export default function Main() {
    return(
        <div className="main">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path={CREATIVES_PAGE_PATH} component={Creators} />
                <Route path={SUPPORT_PAGE_PATH} component={Support} />
                <Route path={COMIC_VIEWER_PATH} component={ComicRouter} />
                <Route path={ARCHIVE_PAGE_PATH} component={Archive} />
            </Switch>
        </div>
    );
}