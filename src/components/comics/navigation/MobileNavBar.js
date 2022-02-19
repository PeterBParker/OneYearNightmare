import PageNavButtons from './PageNavButtons';
import {useCookies} from 'react-cookie';
import {useState} from 'react';
import { useEffect } from 'react';

import bookmarkOutline from '../../../assets/bookies/bookies/bookie-short-line-40px.png';
import bookmarkFilled from '../../../assets/bookies/bookies/bookie-short-fill-40px.png';

export default function MobileNavBar(props) {
    const [cookies, setCookie] = useCookies(['mxmBookmarkedPage'])
    const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkOutline);

    useEffect(() => {
        if (props.pageId.toString() === cookies.mxmBookmarkedPage) {
            setBookmarkIcon(bookmarkFilled);
        } else {
            setBookmarkIcon(bookmarkOutline);
        }
    }, [cookies.mxmBookmarkedPage, props.pageId]);

    return (
        <PageNavButtons pageId={props.pageId} isMobile={true} bookmarkIcon={bookmarkIcon} setBookmark={setCookie} clickEffects={props.clickEffects}/>
    );
}