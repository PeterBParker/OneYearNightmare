import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Website Assets - Phase 1/SVG/LOGO-header.svg';
import menuIcon from '../assets/Website Assets - Phase 1/SVG/MOBILE-sandwhich-menu.svg';
import background from '../assets/Website Assets - Phase 1/SVG/MOBILE-header.svg'
import ComicPageAPI from '../api/ComicPageAPI';
import pageData from '../api/data/pagesData.json';
import MobileMenu from './generic/menus/MobileMenu';

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    let volNum = ComicPageAPI.getSeasonNum(pageData.pageCount);
    function toggleMenu() {
        if (showMenu == true) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    }
    return (
        <div>
            <MobileMenu showMenu={showMenu} onMenuChange={toggleMenu}/> 
            <div className="headerGrid w-full pt-3">
                <div className="volDisplayMobile text-mocha-dark font-medium text-left ml-6 self-start">
                    <div className="volTextContainer flex flex-row w-full pt-3">
                        <div className="volText headerVolNum">
                            vol
                        </div>
                        <div className="volNumContainer ml-2">
                            <svg width="32px" height="32px">
                                <g>
                                    <circle cx="14" cy="14"  r="13" strokeWidth="2" stroke="#998f7e" fillOpacity="0%"></circle>
                                    <text x="14" y="14" fill="#998f7e" className="headerVolNum" textAnchor="middle" alignmentBaseline="central">{volNum}</text>
                                </g>
                            </svg>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="headerLogoMobile justify-self-center self-start">
                    <img src={logo} width="170" />
                </div>
                <div className="navMenuMobile ml-auto mr-6">
                    <button onClick={toggleMenu}><img src={menuIcon} width={42} /></button>
                </div>
                <div className="publishDaysMobile text-mocha-dark self-end bg-cream-dark font-medium h-full">
                    <p>mon | thur</p>
                </div>
                <div className="farmHeaderBackground bg-cream-dark">
                    <img src={background}/>
                </div>
            </div>
        </div>
    );
}