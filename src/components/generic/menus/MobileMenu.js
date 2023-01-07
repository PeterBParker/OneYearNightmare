import footerImage from "../../../assets/Website Assets - Phase 1/SVG/MOBILE-menu-image.svg";
import exitButton from "../../../assets/Website Assets - Phase 1/SVG/MOBILE-x.svg";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { auth } from "../../..";
import {
  COMIC_VIEWER_PATH,
  SUPPORT_PAGE_PATH,
  ARCHIVE_PAGE_PATH,
  CREATIVES_PAGE_PATH,
  SIGNIN_PAGE_PATH,
} from "../../Main";

export default function MobileMenu(props) {
  let mobileMenu = useRef(null);

  if (props.showMenu && mobileMenu.current) {
    mobileMenu.current.style.right = "0";
  } else if (!props.showMenu && mobileMenu.current) {
    mobileMenu.current.style.right = "-100%";
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
            <div className="creatorsNavLink">
              <Link to={CREATIVES_PAGE_PATH} onClick={props.onMenuChange}>
                About Us
              </Link>
            </div>
            <div className="supportNavLink">
              <Link to={SUPPORT_PAGE_PATH} onClick={props.onMenuChange}>
                Support Us
              </Link>
            </div>
            <div className="signinNavLink">
              <Link to={SIGNIN_PAGE_PATH} onClick={props.onMenuChange}>
                {auth.currentUser == null ? "Login" : "User"}
              </Link>
            </div>
          </div>
        </div>
        <div className="mobileMenuFooterImage w-full">
          <img src={footerImage} />
        </div>
      </div>
    </div>
  );
}
