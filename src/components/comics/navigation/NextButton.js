import ComicPageAPI from "../../../api/ComicPageAPI";
import activeNextIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-30px.png";
import disabledNextIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-light-30px.png";
import NavButton from "./NavButton";
import { useState, useEffect } from "react";
import { func, string } from "prop-types";

export default function NextButton(props) {
  const [disabled, setDisabled] = useState(true);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    const relObjs = ComicPageAPI.getRelValidObjs(props.pageId);
    if (!relObjs.pageObj.nextPageUuid) {
      setNextPage(null);
      setDisabled(true);
    } else {
      setNextPage("/read/" + relObjs.pageObj.nextPageUuid);
      setDisabled(false);
    }
  }, [props.pageId]);

  return (
    <NavButton
      disabled={disabled}
      pageFilePath={nextPage}
      clickEffects={props.clickEffects}
      activeIcon={activeNextIcon}
      disabledIcon={disabledNextIcon}
      animationClass="hover-bump-right"
    />
  );
}

NextButton.propTypes = {
  pageId: string.isRequired,
  clickEffects: func.isRequired,
};
