import {Switch, Route} from 'react-router-dom';
import ComicRouter from './comics/ComicRouter';
import Creators from './creators/Creators';
import Support from './creators/Support';
import Home from './Home';

const MOST_RECENT_PAGE = '1';
const MOST_RECENT_SEASON = 'prologue';
export const COMIC_VIEWER_DEFAULT_PATH = `/read/${MOST_RECENT_SEASON}/${MOST_RECENT_PAGE}`;

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