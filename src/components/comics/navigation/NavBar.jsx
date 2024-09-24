import PageNavButtons from "./PageNavButtons";
import { useEffect } from "react";
import { BOOKMARK_KEY } from "../../../index";

import bookmarkOutline from "../../../assets/bookies/bookies/bookie-short-line-40px.png";
import bookmarkFilled from "../../../assets/bookies/bookies/bookie-short-fill-40px.png";
import { useState } from "react";
import { bool, func } from "prop-types";
import { useParams } from "react-router-dom/dist";
import { PARAM_PAGE_UUID } from "../../../api/RefKeys";

export default function NavBar(props) {
  const params = useParams();
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkOutline);
  const [bookmarkId, setBookmarkId] = useState(
    localStorage.getItem(BOOKMARK_KEY)
  );

  useEffect(() => {
    localStorage.setItem(BOOKMARK_KEY, bookmarkId);
  }, [bookmarkId]);

  useEffect(() => {
    if (params[PARAM_PAGE_UUID] === bookmarkId) {
      setBookmarkIcon(bookmarkFilled);
    } else {
      setBookmarkIcon(bookmarkOutline);
    }
  }, [bookmarkId, params]);

  return (
    <PageNavButtons
      isMobile={props.isMobile}
      clickEffects={props.clickEffects}
      bookmarkIcon={bookmarkIcon}
      setBookmark={setBookmarkId}
    />
  );
}

NavBar.propTypes = {
  isMobile: bool.isRequired,
  clickEffects: func.isRequired,
};
