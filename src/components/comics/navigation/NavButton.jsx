import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/dist";
import { Link } from "react-router-dom";
import { func, string, object } from "prop-types";
import { COMIC_VIEWER_PATH } from "../../..";
import { useQuery } from "@tanstack/react-query";

/**
 * NavButton handles the disabling, rendering, and linking of a navigation button. Among the straightforward props
 * such as disabledIcon (image to display when disabled) and animationClass (CSS class to add for an animation),
 * NavButton requires three less-inuitive props:
 *  1. a data query which is an React Query object for fetching the uuid of the page to link to
 *  3. a function that takes as its first and only parameter the data that is returned from using 1 (the query)
 *     and returns empty string if the button should be disabled or the page id to link to if not
 */
export default function NavButton(props) {
  const params = useParams();
  const { data, isLoading } = useQuery(props.query);
  const [disabled, setDisabled] = useState(true);
  const [linkedPage, setLinkedPage] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      let id = props.getPageIdToLinkTo(data);
      if (id === "") {
        setLinkedPage(null);
        setDisabled(true);
      } else {
        setLinkedPage(COMIC_VIEWER_PATH + "/" + id);
        setDisabled(false);
      }
    }
  }, [data, params]);

  let navButton = (
    <div
      className={`transition-all mb-4 justify-self-end self-center bg-white p-4 m-2 rounded-lg z-10 ${
        disabled ? null : "drop-shadow-lg"
      }`}
    >
      {disabled ? (
        <div className="navButton">
          <img
            src={props.disabledIcon}
            width={30}
            alt="disabled navigation first page button"
            className="ml-auto mr-auto"
          />
        </div>
      ) : (
        <div className="navButton" onClick={props.clickEffects}>
          <img
            src={props.activeIcon}
            width={30}
            alt="enabled navigation first page button"
            className="ml-auto mr-auto"
          />
        </div>
      )}
      <div className="font-body text-sm font-semibold">{props.label}</div>
    </div>
  );

  return props.disabled ? (
    <div className="nav-button flex content-center justify-center">
      {navButton}
    </div>
  ) : (
    <div
      className={`nav-button ${props.animationClass} flex content-center justify-center`}
    >
      <Link to={linkedPage} className="flex content-center">
        {navButton}
      </Link>
    </div>
  );
}

NavButton.propTypes = {
  query: object.isRequired,
  clickEffects: func.isRequired,
  activeIcon: string.isRequired,
  disabledIcon: string.isRequired,
  label: string,
  animationClass: string,
};
