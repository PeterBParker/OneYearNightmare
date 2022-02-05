import {Switch, Route, Redirect} from 'react-router-dom';
import ComicViewer from './ComicViewer';
import { useCookies } from 'react-cookie';
import ComicPageAPI from '../../api/ComicPageAPI';

export default function ComicRouter(props) {
    const [cookies, setCookie] = useCookies(['mxmBookmarkedPage'])

    let bookmarkedPageUrl = '/read/';
    console.log("Current bookmark is: ", cookies.mxmBookmarkedPage)
    if (cookies.mxmBookmarkedPage && cookies.mxmBookmarkedPage <= ComicPageAPI.getMaxDisplayPage()) {
            bookmarkedPageUrl = bookmarkedPageUrl.concat(cookies.mxmBookmarkedPage);
    } else {
        // If there is no cookie, we send the reader to the first page
        setCookie('mxmBookmarkedPage', '1', {path: '/'})
        bookmarkedPageUrl = bookmarkedPageUrl.concat('1');
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