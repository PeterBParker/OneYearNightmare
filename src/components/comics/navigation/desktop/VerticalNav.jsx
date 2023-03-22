import PageNavButtons from "../PageNavButtons";
import { useEffect } from "react";
import { BOOKMARK_KEY } from "../../../..";

import bookmarkOutline from "../../../../assets/bookies/bookies/bookie-short-line-40px.png";
import bookmarkFilled from "../../../../assets/bookies/bookies/bookie-short-fill-40px.png";
import { useState } from "react";
import ComicPageAPI from "../../../api/ComicPageAPI";

export default function VerticalNav(props) {
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkOutline);
  const [bookmarkId, setBookmarkId] = useState(
    localStorage.getItem(BOOKMARK_KEY)
  );

  useEffect(() => {
    if (ComicPageAPI.isExistingPage(bookmarkId)) {
      localStorage.setItem(BOOKMARK_KEY, bookmarkId);
    }
  }, [bookmarkId]);

  useEffect(() => {
    if (props.pageId.toString() === bookmarkId) {
      setBookmarkIcon(bookmarkFilled);
    } else {
      setBookmarkIcon(bookmarkOutline);
    }
  }, [bookmarkId, props.pageId]);
  return (
    <div className="vertShare flex flex-col">
      <PageNavButtons
        pageId={props.pageId}
        isMobile={false}
        clickEffects={props.clickEffects}
        bookmarkIcon={bookmarkIcon}
        setBookmark={setBookmarkId}
      />
    </div>
  );
}
