import PageNavButtons from './PageNavButtons';
import {useCookies} from 'react-cookie';
import {useState} from 'react';
import { useEffect } from 'react';

import bookmarkOutline from '../../../assets/Phase3-Assets1/1x/bookmark_border.svg';
import bookmarkFilled from '../../../assets/Phase3-Assets1/1x/bookmark_filled.svg';

export default function MobileNavBar(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['mxmBookmarkedPage'])
    const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkOutline);

    useEffect(() => {
        if (props.pageId.toString() == cookies.mxmBookmarkedPage) {
            console.log(cookies.mxmBookmarkedPage)
            setBookmarkIcon(bookmarkFilled);
        } else {
            setBookmarkIcon(bookmarkOutline);
        }
    }, [cookies.mxmBookmarkedPage, props.pageId]);

    return (
        <PageNavButtons pageId={props.pageId} isMobile={true} bookmarkIcon={bookmarkIcon} setBookmark={setCookie}/>
    );
}