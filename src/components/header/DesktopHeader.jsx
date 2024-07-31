import logo from "../../assets/Website Assets - Phase 1/SVG/LOGO-header.svg";
import { Link } from "react-router-dom";

import ChapterNumIcon from "./ChapterNumIcon";

export default function DesktopHeader() {
  return (
    <div>
      <div className={`headerGridDesktop items-center w-full`}>
        <div className="headerContentDesktop flex flex-row items-center justify-center ">
          <div
            className={`publishDaysDesktop text-mocha-dark self-center desktopHeaderLogoWingData desktopHeaderUpdateSchedule self-center font-medium justify-self-end mr-6 text-md flex-shrink-0`}
          >
            <p className="publishDaysTextDesktop text-right">Updates Mondays</p>
          </div>
          <div className="headerLogoDesktop justify-self-center self-center py-7 px-4 flex-shrink-0">
            <img
              className="headerLogoImageDesktop mx-auto"
              src={logo}
              width="200px"
              height="auto"
              alt=""
            />
          </div>
          <div className="volDisplayDesktop desktopHeaderLogoWingData text-mocha-dark font-medium text-left ml-6 self-center justify-self-start">
            <div className="volTextContainer flex flex-row w-full">
              <div className="volText headerVolNumDesktop self-center text-md">
                chapter
              </div>
              <ChapterNumIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
