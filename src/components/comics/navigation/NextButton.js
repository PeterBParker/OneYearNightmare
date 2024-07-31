import { func, string } from "prop-types";
import { useParams } from "react-router-dom/dist";
import activeNextIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-30px.png";
import disabledNextIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-arrow-light-30px.png";
import NavButton from "./NavButton";
import { pageDataQuery } from "../../../routes/ComicViewer";
import {
  PARAM_PAGE_UUID,
  PAGE_NEXT_PAGE_ID,
  PAGE_KEY,
} from "../../../api/RefKeys";

function getPageIdToLinkTo(data) {
  if (PAGE_KEY in data) {
    if (PAGE_NEXT_PAGE_ID in data[PAGE_KEY]) {
      let nextPageId = data[PAGE_KEY][PAGE_NEXT_PAGE_ID];
      if (nextPageId != null) {
        return nextPageId;
      }
    }
  }
  return "";
}

export default function NextButton(props) {
  const params = useParams();
  return (
    <NavButton
      query={pageDataQuery(params[PARAM_PAGE_UUID])}
      dataKey={PAGE_NEXT_PAGE_ID}
      getPageIdToLinkTo={getPageIdToLinkTo}
      clickEffects={props.clickEffects}
      activeIcon={activeNextIcon}
      disabledIcon={disabledNextIcon}
      animationClass="hover-bump-right"
    />
  );
}

NextButton.propTypes = {
  clickEffects: func.isRequired,
};
