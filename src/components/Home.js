import {Redirect} from 'react-router-dom';
import {COMIC_VIEWER_DEFAULT_PATH} from './Main';
import { useCookies } from 'react-cookie';

export default function Home() {
    const [cookies, setCookie] = useCookies(['mxmBookmarkedPage'])

    let bookmarkedPageUrl = '/read/';
    if (cookies.mxmBookmarkedPage == null) {
        // If there is no cookie, we send the reader to the first page
        setCookie('mxmBookmarkedPage', '1', {path: '/'})
        bookmarkedPageUrl = bookmarkedPageUrl.concat(cookies.mxmBookmarkedPage);
    } else {
        bookmarkedPageUrl = bookmarkedPageUrl.concat(cookies.mxmBookmarkedPage);
    }
    return(
        <Redirect to={bookmarkedPageUrl}/>
    );
}