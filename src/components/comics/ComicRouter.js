import {Switch, Route, Redirect} from 'react-router-dom';
import ComicViewer from './ComicViewer';
import { useCookies } from 'react-cookie';
import ComicPageAPI from '../../api/ComicPageAPI';

export default function ComicRouter(props) {
    const [cookies, setCookie] = useCookies(['mxmBookmarkedPage'])

    let bookmarkedPageUrl = '/read/';
    let maxPage = ComicPageAPI.getMaxDisplayPage();

    if (cookies.mxmBookmarkedPage && cookies.mxmBookmarkedPage <= maxPage) {
            bookmarkedPageUrl = bookmarkedPageUrl.concat(cookies.mxmBookmarkedPage);
    } else {
        // If there is no cookie, we send the reader to the first page on the latest update
        bookmarkedPageUrl = bookmarkedPageUrl.concat((maxPage-1).toString());
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