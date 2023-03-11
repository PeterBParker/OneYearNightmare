import ComicPageAPI from "../../../api/ComicPageAPI";
import activeFirstIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-skip-line-30px.png";
import disabledFirstIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-skip-line-light-30px.png";
import { useState, useEffect } from "react";
import NavButton from "./NavButton";
import { func, string } from "prop-types";

export default function FirstPageButton(props) {
  const firstPageId = ComicPageAPI.getFirstPageId();
  const [disabled, setDisabled] = useState(props.pageId === firstPageId);

  useEffect(() => {
    if (props.pageId === firstPageId) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [props.pageId]);

  const pageFilePath = "/read/" + firstPageId;
  return (
    <NavButton
      disabled={disabled}
      pageFilePath={pageFilePath}
      clickEffects={props.clickEffects}
      activeIcon={activeFirstIcon}
      disabledIcon={disabledFirstIcon}
      animationClass="hover-bump-left"
    />
  );
}

FirstPageButton.propTypes = {
  pageId: string.isRequired,
  clickEffects: func.isRequired,
};
