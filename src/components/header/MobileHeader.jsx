import logo from "../../assets/Website Assets - Phase 1/SVG/LOGO-header.svg";
import { Link } from "react-router-dom";
import ChapterNumIcon from "./ChapterNumIcon";
import HamburgerMenu from "./HamburgerMenu";

import { COMIC_VIEWER_DEFAULT_PATH } from "../Main";

export default function MobileHeader(props) {
  return (
    <div>
      <div
        className={`headerGrid w-full pt-3 pb-6 ${
          props.defaultBg ? "bg-cream-light" : "bg-white"
        } ${
          props.defaultBg ? "lightHeaderBg" : "darkHeaderBg"
        } headerBg mobileHeaderBg`}
      >
        <div className="volDisplayMobile text-mocha-dark font-medium text-left ml-6 self-start">
          <div className="volTextContainer flex flex-row w-full pt-3">
            <div className="volText headerVolNum headerVolMobile">chap.</div>
            <ChapterNumIcon />
          </div>
        </div>
        <div className="headerLogoMobile justify-self-center self-start">
          <Link to={COMIC_VIEWER_DEFAULT_PATH}>
            <img src={logo} width="170" />
          </Link>
        </div>
        <HamburgerMenu />
      </div>
      <div
        className={`publishDaysMobile text-mocha-dark self-end pb-2 font-medium h-full ${
          props.defaultBg ? "bg-white" : "bg-cream-dark"
        }`}
      >
        <p>Updates every Monday</p>
      </div>
    </div>
  );
}
