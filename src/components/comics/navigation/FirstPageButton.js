import ComicPageAPI from "../../../api/ComicPageAPI";
import { Link } from "react-router-dom";
import activeFirstIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-skip-30px.png";
import disabledFirstIcon from "../../../assets/FINAL-ASSETS-072821/final assets/left-skip-light-30px.png";

export default function FirstPageButton(props) {
  const disabledButton = (
    <div className="navButton">
      <img
        src={disabledFirstIcon}
        width={30}
        alt="disabled navigation first page button"
      />
    </div>
  );
  const firstPageId = ComicPageAPI.getFirstPage().uuid;

  if (props.pageId === firstPageId) {
    return disabledButton;
  }
  const pageFilePath = "/read/" + firstPageId;
  return (
    <div className="navButton" onClick={props.clickEffects}>
      <Link to={pageFilePath}>
        <img
          src={activeFirstIcon}
          width={30}
          alt="enabled navigation first page button"
        />
      </Link>
    </div>
  );
}
