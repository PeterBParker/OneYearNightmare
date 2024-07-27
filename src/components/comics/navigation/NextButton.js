import { func, string } from "prop-types";
import { useParams } from "react-router-dom/dist";
import activeNextIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-30px.png";
import disabledNextIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-light-30px.png";
import NavButton from "./NavButton";
import { pageDataQuery } from "../../../routes/ComicViewer";
import { PARAM_PAGE_UUID, NEXT_PAGE_ID } from "../../../api/RefKeys";

function shouldDisable(nextPageId) {
  if (!nextPageId) {
    return true;
  }
  return false;
}

export default function NextButton(props) {
  const params = useParams();
  return (
    <NavButton
      query={pageDataQuery(params[PARAM_PAGE_UUID])}
      dataKey={NEXT_PAGE_ID}
      shouldDisable={shouldDisable}
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
