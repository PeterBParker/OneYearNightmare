import { Link } from "react-router-dom";
import Pages from "./Pages";
import { auth } from "../../../../index";
import {
  COMIC_VIEWER_PATH,
  ARCHIVE_PAGE_PATH,
  SIGNIN_PAGE_PATH,
} from "../../../Main";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NavBarLinks(props) {
  const [user, loading, error] = useAuthState(auth);
  const [userPage, setUserPage] = useState(user ? "User Settings" : "Login");

  useEffect(() => {
    if (user == null) {
      setUserPage("Login");
    } else {
      setUserPage("User Settings");
    }
  }, [user]);
  return [
    <div
      className={`${
        props.page.name === Pages.READ.name
          ? "desktopNavLinkSelected"
          : "desktopNavLink desktop-nav-hover"
      } text-grey-light mr-8 font-medium`}
      key="readNavBarLink"
    >
      <Link to={COMIC_VIEWER_PATH}>Read</Link>
    </div>,
    <div
      className={`${
        props.page.name === Pages.ARCHIVE.name
          ? "desktopNavLinkSelected"
          : "desktopNavLink desktop-nav-hover"
      } text-grey-light mr-8 font-medium`}
      key="archiveNavBarLink"
    >
      <Link to={ARCHIVE_PAGE_PATH}>Archive</Link>
    </div>,
    <div
      className={`${
        props.page.name === Pages.SIGNIN.name
          ? "desktopNavLinkSelected"
          : "desktopNavLink desktop-nav-hover"
      } text-grey-light mr-8 font-medium`}
      key="signinNavBarLink"
    >
      <Link to={SIGNIN_PAGE_PATH}>{userPage}</Link>
    </div>,
    <div
      className={`${
        props.page.name === Pages.SCHEDULE.name
          ? "desktopNavLinkSelected"
          : "desktopNavLink desktop-nav-hover"
      } text-grey-light font-medium`}
      key="scheduleNavBarLink"
    >
      <a
        href={
          "https://cosmic-marmoset-384.notion.site/34c6fb7629fe42599319f0b4adc8be7f?v=b0e4396668254195b01a305d1f6249eb"
        }
      >
        Schedule
      </a>
    </div>,
  ];
}
