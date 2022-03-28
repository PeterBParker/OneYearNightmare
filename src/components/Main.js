import { useState } from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import Archive from './comics/archive/Archive';
import ComicRouter from './comics/ComicRouter';
import Creators from './creators/about/Creators';
import Support from './creators/supportUsCards/Support';
import Home from './Home';
import Pages from './comics/navigation/desktop/Pages';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../styling/breakpoints.json';

export const DOMAIN = 'https://monstersandmyriads.com';
export const BASE_PATH = '/MnMPages/';
export const JOINT_SIG = 'Mo and Nate';


export const COMIC_VIEWER_DEFAULT_PATH = '/read/1';
export const COMIC_VIEWER_PATH = '/read';
export const SUPPORT_PAGE_PATH = '/support';
export const ARCHIVE_PAGE_PATH = '/archive';
export const CREATIVES_PAGE_PATH = '/creatives';

export const SNAP_TO_PAGE_PATH = 'snap-to-page';

export default function Main(props) {
    const location = useLocation();
    const isDesktop = useMediaQuery({query: querySizes['lg']});

    // TODO The idea is to render the header outside of the switch and then use the currentPage to determine the header color
    // the main downside to this idea is that I need to provide a default color
    let desktopLightBg = "desktopDefaultBg desktopBg";
    let desktopDarkBg = "comicViewerDesktop desktopBg";
    let mobileLightBg = "bg-cream-light lightHeaderBg headerBg mobileHeaderBg";
    let mobileDarkBg =  "bg-white darkHeaderBg headerBg mobileHeaderBg";

    let headerColorClassNames = desktopDarkBg;

    if(location.pathname.startsWith(COMIC_VIEWER_PATH)) {
        if(isDesktop) {
            headerColorClassNames = desktopDarkBg;
        } else {
            headerColorClassNames = mobileDarkBg;
        }
    } else {
        if(isDesktop) {
            headerColorClassNames = desktopLightBg;
        } else {
            headerColorClassNames = mobileLightBg;
        }

    }

    return(
        <div className={`main backgroundTransition ${headerColorClassNames}`}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path={CREATIVES_PAGE_PATH}>
                    <Creators />
                </Route>
                <Route path={SUPPORT_PAGE_PATH}>
                    <Support />
                </Route>
                <Route path={COMIC_VIEWER_PATH}>
                    <ComicRouter />
                </Route>
                <Route path={ARCHIVE_PAGE_PATH}>
                    <Archive />
                </Route>
            </Switch>
        </div>
    );
}