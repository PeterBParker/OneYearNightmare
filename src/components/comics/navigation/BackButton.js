import { useParams } from "react-router-dom/dist";
import activeBackIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-arrow-30px.png";
import disabledBackIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-arrow-light-30px.png";
import NavButton from "./NavButton";
import { func, string } from "prop-types";
import { pageDataQuery } from "../../../routes/ComicViewer";
import { PARAM_PAGE_UUID, PREV_PAGE_ID } from "../../../api/RefKeys";

function shouldDisable(prevPageId) {
  if (!prevPageId) {
    return true;
  }
  return false;
}

export default function BackButton(props) {
  const params = useParams();
  return (
    <NavButton
      query={pageDataQuery(params[PARAM_PAGE_UUID])}
      dataKey={PREV_PAGE_ID}
      shouldDisable={shouldDisable}
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
