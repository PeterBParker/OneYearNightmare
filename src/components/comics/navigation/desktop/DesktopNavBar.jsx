import PageNavButtons from "../PageNavButtons";
import { useEffect } from "react";
import { BOOKMARK_KEY } from "../../../..";

import bookmarkOutline from "../../../../assets/bookies/bookies/bookie-short-line-40px.png";
import bookmarkFilled from "../../../../assets/bookies/bookies/bookie-short-fill-40px.png";
import { useState } from "react";

export default function DesktopNavBar(props) {
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkOutline);
  const [bookmarkId, setBookmarkId] = useState(
    localStorage.getItem(BOOKMARK_KEY)
  );
  const [bookmarked, setIfBookmarked] = useState(false);

  useEffect(() => {
    localStorage.setItem(BOOKMARK_KEY, bookmarkId);
  }, [bookmarkId]);

  useEffect(() => {
    if (props.pageId.toString() === bookmarkId) {
      setBookmarkIcon(bookmarkFilled);
      setIfBookmarked(true);
    } else {
      setBookmarkIcon(bookmarkOutline);
      setIfBookmarked(false);
    }
  }, [bookmarkId, props.pageId]);

  let middleButtons = null;
  if (props.pageId) {
    middleButtons = (
      <PageNavButtons
        pageId={props.pageId}
        isMobile={false}
        clickEffects={props.clickEffects}
      />
    );
  } else {
    middleButtons = "";
  }

  return (
    <div className="desktopNavBarContainer flex flex-row justify-between bg-white px-0 mx-auto">
      <div className="desktopNavButtons self-center">{middleButtons}</div>
      <div
        className={`${
          bookmarked ? "bookmarkFilled" : "bookmarkEmpty"
        } bookmarkButton self-center ml-auto my-4 mr-4`}
        onClick={() => setBookmarkId(props.pageId.toString())}
      >
        <img src={bookmarkIcon} width={40} alt="bookmark button" />
      </div>
    </div>
  );
}
