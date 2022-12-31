import { Link } from "react-router-dom";
import Pages from "./Pages";
import {
  COMIC_VIEWER_PATH,
  SUPPORT_PAGE_PATH,
  ARCHIVE_PAGE_PATH,
  CREATIVES_PAGE_PATH,
} from "../../../Main";

export default function NavBarLinks(props) {
  return [
    <div
      className={`${
        props.page.name === Pages.ABOUT.name
          ? "desktopNavLinkSelected"
          : "desktopNavLink"
      } text-grey-light mr-8 font-medium `}
      key="aboutNavBarLink"
    >
      <Link to={CREATIVES_PAGE_PATH}>About</Link>
    </div>,
    <div
      className={`${
        props.page.name === Pages.READ.name
          ? "desktopNavLinkSelected"
          : "desktopNavLink"
      } text-grey-light mr-8 font-medium `}
      key="readNavBarLink"
    >
      <Link to={COMIC_VIEWER_PATH}>Read</Link>
    </div>,
    <div
      className={`${
        props.page.name === Pages.ARCHIVE.name
          ? "desktopNavLinkSelected"
          : "desktopNavLink"
      } text-grey-light mr-8 font-medium `}
      key="archiveNavBarLink"
    >
      <Link to={ARCHIVE_PAGE_PATH}>Archive</Link>
    </div>,
    <div
      className={`${
        props.page.name === Pages.SUPPORT.name
          ? "desktopNavLinkSelected"
          : "desktopNavLink"
      } text-grey-light mr-8 font-medium `}
      key="supportNavBarLink"
    >
      <Link to={SUPPORT_PAGE_PATH}>Support</Link>
    </div>,
  ];
}
