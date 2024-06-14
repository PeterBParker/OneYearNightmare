import { Link } from "react-router-dom";
import { bool, func, string } from "prop-types";

export default function NavButton(props) {
  let navButton = (
    <div
      className={`transition-all mb-4 justify-self-end self-center bg-white p-4 m-2 rounded-lg z-10 ${
        props.disabled ? null : "drop-shadow-lg"
      }`}
    >
      {props.disabled ? (
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
      <Link to={props.pageFilePath} className="flex content-center">
        {navButton}
      </Link>
    </div>
  );
}

NavButton.propTypes = {
  disabled: bool.isRequired,
  pageFilePath: string,
  clickEffects: func.isRequired,
  activeIcon: string.isRequired,
  disabledIcon: string.isRequired,
  label: string,
  animationClass: string,
};
