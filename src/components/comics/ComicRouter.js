import {Switch, Route, Redirect} from 'react-router-dom';
import { COMIC_VIEWER_DEFAULT_PATH } from '../Main';
import ComicViewer from './ComicViewer';
import { useCookies } from 'react-cookie';

export default function ComicRouter(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['mxmBookmarkedPage'])

    let bookmarkedPageUrl = '/read/';
    if (cookies.mxmBookmarkedPage == null) {
        // If there is no cookie, we send the reader to the first page
        setCookie('mxmBookmarkedPage', '1', {path: '/'})
        bookmarkedPageUrl = bookmarkedPageUrl.concat(cookies.mxmBookmarkedPage);
    } else {
        bookmarkedPageUrl = bookmarkedPageUrl.concat(cookies.mxmBookmarkedPage);
    }
    return (
        <div className="comicViewerPage">
            <Switch>
                <Route exact path="/read">
                    <Redirect to={bookmarkedPageUrl} /> 
                </Route>
                <Route path="/read/:pageId" component={ComicViewer}/>
            </Switch>
        </div>
    );
}