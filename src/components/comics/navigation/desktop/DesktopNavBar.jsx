import PageNavButtons from '../PageNavButtons';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

import bookmarkOutline from '../../../../assets/bookies/bookies/bookie-short-line-40px.png';
import bookmarkFilled from '../../../../assets/bookies/bookies/bookie-short-fill-40px.png';
import { useState } from 'react';

export default function DesktopNavBar(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['mxmBookmarkedPage'])
    const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkOutline);
    const [bookmarked, setIfBookmarked] = useState(false);

    useEffect(() => {
        if (props.pageId.toString() == cookies.mxmBookmarkedPage) {
            console.log(cookies.mxmBookmarkedPage)
            setBookmarkIcon(bookmarkFilled);
            setIfBookmarked(true);
        } else {
            setBookmarkIcon(bookmarkOutline);
            setIfBookmarked(false);
        }
    }, [cookies.mxmBookmarkedPage, props.pageId]);

    let middleButtons = null
    if (props.pageId) {
        middleButtons = <PageNavButtons pageId={props.pageId} isMobile={false} />
        
    } else {
        middleButtons = ''
    }

    return (
        <div className="desktopNavBarContainer flex flex-row justify-between bg-white px-0 mx-auto">
            <div className="desktopNavButtons self-center">
                {middleButtons}
            </div>
            <div className={`${bookmarked ? 'bookmarkFilled' : 'bookmarkEmpty'} bookmarkButton self-center ml-auto my-4 mr-4`} onClick={() => setCookie('mxmBookmarkedPage', props.pageId.toString(), {path: '/'})}>
                <img src={bookmarkIcon} width={40} />
            </div>
        </div>
    );
}