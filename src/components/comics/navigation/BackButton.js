import { PageAPI } from "../../../index";
import activeBackIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-arrow-30px.png";
import disabledBackIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-arrow-light-30px.png";
import NavButton from "./NavButton";
import { useState, useEffect } from "react";
import { func, string } from "prop-types";

export default function BackButton(props) {
  const [disabled, setDisabled] = useState(true);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    const relObjs = PageAPI.getRelValidObjs(props.pageId);
    if (!relObjs.pageObj.prevPageUuid) {
      setPrevPage(null);
      setDisabled(true);
    } else {
      setPrevPage("/read/" + relObjs.pageObj.prevPageUuid);
      setDisabled(false);
    }
  }, [props.pageId]);

  return (
    <NavButton
      disabled={disabled}
      pageFilePath={prevPage}
      clickEffects={props.clickEffects}
      activeIcon={activeBackIcon}
      disabledIcon={disabledBackIcon}
      animationClass="hover-bump-left"
    />
  );
}

BackButton.propTypes = {
  pageId: string.isRequired,
  clickEffects: func.isRequired,
};
