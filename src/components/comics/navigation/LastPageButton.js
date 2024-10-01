import { useParams } from "react-router-dom/dist";
import activeLastIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-skip-line-30px.png";
import disabledLastIcon from "../../../assets/FINAL-ASSETS-072821/final assets/right-skip-line-light-30px.png";
import NavButton from "./NavButton";
import { func, string } from "prop-types";
import { displayQuery } from "../../../routes/Reader";
import { MAX_PAGE_ID_KEY, PARAM_PAGE_UUID } from "../../../api/RefKeys";

export default function LastPageButton(props) {
  const params = useParams();

  function getPageIdToLinkTo(data) {
    if (MAX_PAGE_ID_KEY in data) {
      let lastPageId = data[MAX_PAGE_ID_KEY];
      // Check if we are on the first page
      if (lastPageId === params[PARAM_PAGE_UUID]) {
        return "";
      }
      return lastPageId;
    }
    // The data hasn't loaded yet and we don't know
    return "";
  }

  return (
    <NavButton
      query={displayQuery()}
      dataKey={MAX_PAGE_ID_KEY}
      getPageIdToLinkTo={getPageIdToLinkTo}
      clickEffects={props.clickEffects}
      activeIcon={activeLastIcon}
      disabledIcon={disabledLastIcon}
      animationClass="hover-bump-right"
    />
  );
}

LastPageButton.propTypes = {
  clickEffects: func.isRequired,
};
