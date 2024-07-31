import { useParams } from "react-router-dom/dist";
import activeBackIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-arrow-30px.png";
import disabledBackIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-arrow-light-30px.png";
import NavButton from "./NavButton";
import { func, string } from "prop-types";
import { pageDataQuery } from "../../../routes/ComicViewer";
import {
  PARAM_PAGE_UUID,
  PAGE_PREV_PAGE_ID,
  PAGE_KEY,
} from "../../../api/RefKeys";

function getPageIdToLinkTo(data) {
  if (PAGE_KEY in data) {
    if (PAGE_PREV_PAGE_ID in data[PAGE_KEY]) {
      let prevPageId = data[PAGE_KEY][PAGE_PREV_PAGE_ID];
      if (prevPageId != null) {
        return prevPageId;
      }
    }
  }
  return "";
}

export default function BackButton(props) {
  const params = useParams();
  return (
    <NavButton
      query={pageDataQuery(params[PARAM_PAGE_UUID])}
      dataKey={PAGE_PREV_PAGE_ID}
      getPageIdToLinkTo={getPageIdToLinkTo}
      clickEffects={props.clickEffects}
      activeIcon={activeBackIcon}
      disabledIcon={disabledBackIcon}
      animationClass="hover-bump-left"
    />
  );
}

BackButton.propTypes = {
  clickEffects: func.isRequired,
};
