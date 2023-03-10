import menuIcon from "../../assets/Website Assets - Phase 1/SVG/MOBILE-sandwhich-menu.svg";
import MobileMenu from "../generic/menus/MobileMenu";
import { useState } from "react";

export default function HamburgerMenu() {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    if (showMenu === true) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }

  return (
    <>
      <MobileMenu showMenu={showMenu} onMenuChange={toggleMenu} />
      <div className="navMenuMobile ml-auto mr-6">
        <button onClick={toggleMenu}>
          <img src={menuIcon} width={42} alt="" />
        </button>
      </div>
    </>
  );
}
