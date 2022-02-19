import {Switch, Route, Redirect} from 'react-router-dom';
import ComicViewer from './ComicViewer';
import { useCookies } from 'react-cookie';
import ComicPageAPI from '../../api/ComicPageAPI';
import { COMIC_VIEWER_PATH } from '../Main';
import { useEffect } from 'react';
import Pages from './navigation/desktop/Pages';

export default function ComicRouter(props) {
    const [cookies, setCookie] = useCookies(['mxmBookmarkedPage']);
    
    useEffect(() => {
        props.setMainPageState(Pages.READ);
    }, []);

    const maxPage = ComicPageAPI.getMaxDisplayPage()

    let bookmarkedPageUrl = COMIC_VIEWER_PATH+ '/';
    if (cookies.mxmBookmarkedPage && cookies.mxmBookmarkedPage <= maxPage) {
            bookmarkedPageUrl = bookmarkedPageUrl.concat(cookies.mxmBookmarkedPage);
    } else {
        // If there is no cookie, we send the reader to the first page on the latest update
        bookmarkedPageUrl = bookmarkedPageUrl.concat((maxPage-1).toString());
    }
    return (
        <div className="comicViewerPage">
            <Switch>
                <Route exact path={COMIC_VIEWER_PATH}>
                    <Redirect to={bookmarkedPageUrl} /> 
                </Route>
                <Route path="/read/:pageId/:focus" component={ComicViewer}/>
                <Route path="/read/:pageId" component={ComicViewer}/>
            </Switch>
        </div>
    );
}