import PageNavButtons from '../PageNavButtons';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

import bookmarkOutline from '../../../../assets/Phase3-Assets1/1x/bookmark_border.svg';
import bookmarkFilled from '../../../../assets/Phase3-Assets1/1x/bookmark_filled.svg';
import { useState } from 'react';

export default function DesktopNavBar(props) {
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
            <div className="bookmarkButton self-center ml-auto" onClick={() => setCookie('mxmBookmarkedPage', props.pageId.toString(), {path: '/'})}>
                <img src={bookmarkIcon} width={50} />
            </div>
        </div>
    );
}