import { useParams } from "react-router-dom/dist";
import activeFirstIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-skip-line-30px.png";
import disabledFirstIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-skip-line-light-30px.png";
import NavButton from "./NavButton";
import { func, string } from "prop-types";
import { displayQuery } from "../../../routes/Reader";
import { FIRST_PAGE_ID_KEY, PARAM_PAGE_UUID } from "../../../api/RefKeys";

export default function FirstPageButton(props) {
  const params = useParams();

  function shouldDisable(firstPageId) {
    if (firstPageId === params[PARAM_PAGE_UUID]) {
      return true;
    }
    return false;
  }

  return (
    <NavButton
      query={displayQuery()}
      dataKey={FIRST_PAGE_ID_KEY}
      shouldDisable={shouldDisable}
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
