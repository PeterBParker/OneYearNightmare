import ComicPageAPI from "../../../api/ComicPageAPI";
import activeLastIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-skip-line-30px.png";
import disabledLastIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-skip-line-light-30px.png";
import NavButton from "./NavButton";
import { useState, useEffect } from "react";
import { func, string } from "prop-types";

export default function LastPageButton(props) {
  const lastPageId = ComicPageAPI.getMaxDisplayPage();
  const [disabled, setDisabled] = useState(props.pageId === lastPageId);

  useEffect(() => {
    if (props.pageId === lastPageId) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [props.pageId]);

  const pageFilePath = "/read/" + lastPageId;
  return (
    <NavButton
      disabled={disabled}
      pageFilePath={pageFilePath}
      clickEffects={props.clickEffects}
      activeIcon={activeLastIcon}
      disabledIcon={disabledLastIcon}
      animationClass="hover-bump-right"
    />
  );
}

LastPageButton.propTypes = {
  pageId: string.isRequired,
  clickEffects: func.isRequired,
};
