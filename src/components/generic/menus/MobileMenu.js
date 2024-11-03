import footerImage from "../../../assets/Website Assets - Phase 1/SVG/MOBILE-menu-image.svg";
import exitButton from "../../../assets/Website Assets - Phase 1/SVG/MOBILE-x.svg";
import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { auth, CONTENT_MANAGEMENT_PATH, USER_PROFILE_PAGE_PATH } from "../../..";
import {
  COMIC_VIEWER_PATH,
  ARCHIVE_PAGE_PATH,
  SIGNIN_PAGE_PATH,
} from "../../../index";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MobileMenu(props) {
  let mobileMenu = useRef(null);
  const [showAdminLinks, setShowAdminLinks] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  let banner = document.getElementById("sfbanner");
  if (!!banner) {
    banner.style.position = "absolute";
    banner.style.transition = "all 0.5s ease-in-out"
  }

  useEffect(() => {
    if (!loading && !error && user !== null) {
      user.getIdTokenResult().then((token) => {
        if(!!token.claims.admin) {
          setShowAdminLinks(true)
        }
      })
    }
  })

  if (props.showMenu && mobileMenu.current) {
    // Get spider forest banner
    banner.style.top = "-100%";
    mobileMenu.current.style.right = "0";
  } else if (!props.showMenu && mobileMenu.current) {
    mobileMenu.current.style.right = "-100%";
    banner.style.top = "0";
  }
  return (
    <div className="mobileMenuOverlay" ref={mobileMenu}>
      <div className="mobileMenuContainer bg-grey-light">
        <div className="mobileMenuExitContainer grid justify-end">
          <div className="mr-3">
            <button
              onClick={props.onMenuChange}
              className="mobileMenuExitButton"
            >
              <img src={exitButton} width={32} />
            </button>
          </div>
        </div>
        <div className="mobileMenuLinks text-green font-header text-3xl">
          <div className="mobileMenuLinksSpacer grid 5 grid-cols-1">
            <div className="comicViewerNavLink">
              <Link to={COMIC_VIEWER_PATH} onClick={props.onMenuChange}>
                Read
              </Link>
            </div>
            <div className="archiveNavLink">
              <Link to={ARCHIVE_PAGE_PATH} onClick={props.onMenuChange}>
                Archive
              </Link>
            </div>
            {
              auth.currentUser == null ?
                <div className="signinNavLink">
                <Link to={SIGNIN_PAGE_PATH} onClick={props.onMenuChange}>
                  Login
                </Link>
                </div>
            :
              <div className="signinNavLink">
                <Link to={USER_PROFILE_PAGE_PATH} onClick={props.onMenuChange}>
                  User
                </Link>
              </div>
            }
            {showAdminLinks ?
              <div className="cmsNavLink">
                <Link to={CONTENT_MANAGEMENT_PATH} onClick={props.onMenuChange}>
                  Manage
                </Link>
              </div>
            :
              null
            }
          </div>
        </div>
        <div className="mobileMenuFooterImage w-full">
          <img src={footerImage} />
        </div>
      </div>
    </div>
  );
}
