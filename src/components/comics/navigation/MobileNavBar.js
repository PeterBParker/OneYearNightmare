import PageNavButtons from "./PageNavButtons";
import { useState } from "react";
import { useEffect } from "react";
import { BOOKMARK_KEY } from "../../../index";

import bookmarkOutline from "../../../assets/bookies/bookies/bookie-short-line-40px.png";
import bookmarkFilled from "../../../assets/bookies/bookies/bookie-short-fill-40px.png";

export default function MobileNavBar(props) {
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkOutline);
  const [bookmarkId, setBookmarkId] = useState(
    localStorage.getItem(BOOKMARK_KEY)
  );

  useEffect(() => {
    localStorage.setItem(BOOKMARK_KEY, bookmarkId);
  }, [bookmarkId]);

  useEffect(() => {
    if (props.pageId.toString() === bookmarkId) {
      setBookmarkIcon(bookmarkFilled);
    } else {
      setBookmarkIcon(bookmarkOutline);
    }
  }, [bookmarkId, props.pageId]);

  return (
    <PageNavButtons
      pageId={props.pageId}
      isMobile={true}
      bookmarkIcon={bookmarkIcon}
      setBookmark={setBookmarkId}
      clickEffects={props.clickEffects}
    />
  );
}
