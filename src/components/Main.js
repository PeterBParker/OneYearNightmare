import {Switch, Route} from 'react-router-dom';
import ComicRouter from './comics/ComicRouter';
import Creators from './creators/Creators';
import Support from './creators/Support';
import Home from './Home';
import pageData from '../api/data/pagesData.json';

// To add page:
//  1. Update MOST_RECENT_PAGE
//  2. Update MOST_RECENT_SEASON (if necessary)
//  3. Add to ComicPageAPI 'pages' object


const MOST_RECENT_PAGE_ID = pageData.pageCount;
export const DOMAIN = 'https://oneyearnightmarefirstsite.web.app';
export const BASE_PATH = '/OneYearNightmarePages/';


export const COMIC_VIEWER_DEFAULT_PATH = `/read/${MOST_RECENT_PAGE_ID}`;

export default function Main() {
    return(
        <div>
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