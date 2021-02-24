import {Switch, Route, Redirect} from 'react-router-dom';
import { COMIC_VIEWER_DEFAULT_PATH } from '../Main';
import ComicViewer from './ComicViewer';

export default function ComicRouter(props) {
    return (
        <div className="comicViewerPage">
            <h1>
                Read Here!
            </h1>
            <Switch>
                {/*Look up how to do pattern matching so you don't have to do exact path*/}
                <Route exact path="/read">
                    <Redirect to={COMIC_VIEWER_DEFAULT_PATH} /> 
                </Route>
                <Route path="/read/:season/:pageNum" component={ComicViewer}/>
            </Switch>
        </div>
    );
}