import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Pages from "./Pages";
import { auth } from "../../../../index";
import {
  COMIC_VIEWER_PATH,
  ARCHIVE_PAGE_PATH,
  SIGNIN_PAGE_PATH,
  USER_PROFILE_PAGE_PATH,
  CONTENT_MANAGEMENT_PATH
} from "../../../../index";
import { useAuthState } from "react-firebase-hooks/auth";



export default function NavBarLinks(props) {
  const [user, loading, error] = useAuthState(auth);
  const [showAdminLinks, setShowAdminLinks] = useState(false)
  const [userPage, setUserPage] = useState(user ? "User Settings" : "Login");
  let location = useLocation();
  const [currPage, setCurrPage] = useState(Pages.READ)

  useEffect(() => {
    // Splitting the pathname because read page has page id's tailing its path
    setCurrPage(location.pathname.split("/")[1])
  }, [location.pathname])

  useEffect(() => {
    if (user == null) {
      setUserPage("Login");
    } else {
      setUserPage("User Settings");
      console.log(user)
      user.getIdTokenResult().then((token) => {
        if (!!token.claims.admin) {
          setShowAdminLinks(true)
        }
      })
    }
  }, [user]);

  function buildLink(toPath, displayStr) {
    return(
      <div
      className={`${
        currPage === toPath.split("/")[1]
          ? "desktopNavLinkSelected"
          : "desktopNavLink desktop-nav-hover"
      } text-grey-light mr-8 font-medium`}
      key={displayStr + "NavBarLink"}
    >
      <Link to={toPath}>{displayStr}</Link>
    </div>
    )
  }

  return [
    buildLink(COMIC_VIEWER_PATH, "Read"),
    buildLink(ARCHIVE_PAGE_PATH, "Archive"),
    user === null ? buildLink(SIGNIN_PAGE_PATH, "Login") : buildLink(USER_PROFILE_PAGE_PATH, "Profile"),
    showAdminLinks ? buildLink(CONTENT_MANAGEMENT_PATH, "Manage") : null,
  ];
}
