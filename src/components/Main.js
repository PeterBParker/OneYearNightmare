import {Switch, Route} from 'react-router-dom';
import ComicRouter from './comics/ComicRouter';
import Creators from './creators/about/Creators';
import Support from './creators/supportUsCards/Support';
import Home from './Home';
import pageData from '../api/data/pagesData.json';

const MOST_RECENT_PAGE_ID = pageData.pageCount;
export const DOMAIN = 'https://monstersandmyriads.com';
export const BASE_PATH = '/MnMPages/';
export const JOINT_SIG = 'Mo and Nate';


export const COMIC_VIEWER_DEFAULT_PATH = `/read`;

export default function Main() {
    return(
        <div className="main">
            <Switch>
                {/* Replace this first route with a redirect to read*/}
                <Route exact path='/' component={Home} />
                <Route path='/creatives' component={Creators} />
                <Route path='/support' component={Support} />
                <Route path='/read' component={ComicRouter} />
            </Switch>
        </div>
    );
}