import PageNavButtons from "./PageNavButtons";
import { useEffect } from "react";
import { BOOKMARK_KEY } from "../../../index";

import bookmarkOutline from "../../../assets/bookies/bookies/bookie-short-line-40px.png";
import bookmarkFilled from "../../../assets/bookies/bookies/bookie-short-fill-40px.png";
import { useState } from "react";
import { bool, func, string } from "prop-types";
import { PageAPI } from "../../../index";

export default function NavBar(props) {
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkOutline);
  const [bookmarkId, setBookmarkId] = useState(
    localStorage.getItem(BOOKMARK_KEY)
  );

  useEffect(() => {
    if (PageAPI.isExistingPage(bookmarkId)) {
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
    <PageNavButtons
      pageId={props.pageId}
      isMobile={props.isMobile}
      clickEffects={props.clickEffects}
      bookmarkIcon={bookmarkIcon}
      setBookmark={setBookmarkId}
    />
  );
}

NavBar.propTypes = {
  pageId: string.isRequired,
  isMobile: bool.isRequired,
  clickEffects: func.isRequired,
};
