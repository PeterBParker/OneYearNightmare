import { useState } from 'react';
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
    const [currentPage, setCurrentPage] = useState(null);

    // TODO The idea is to render the header outside of the switch and then use the currentPage to determine the header color
    // the main downside to this idea is that I need to provide a default color
    return(
        <div className="main">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path={CREATIVES_PAGE_PATH}>
                    <Creators mainPageState={currentPage} setMainPageState={setCurrentPage}/>
                </Route>
                <Route path={SUPPORT_PAGE_PATH}>
                    <Support mainPageState={currentPage} setMainPageState={setCurrentPage}/>
                </Route>
                <Route path={COMIC_VIEWER_PATH}>
                    <ComicRouter mainPageState={currentPage} setMainPageState={setCurrentPage}/>
                </Route>
                <Route path={ARCHIVE_PAGE_PATH}>
                    <Archive mainPageState={currentPage} setMainPageState={setCurrentPage}/>
                </Route>
            </Switch>
        </div>
    );
}