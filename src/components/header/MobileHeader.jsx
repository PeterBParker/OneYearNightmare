import logo from '../../assets/Website Assets - Phase 1/SVG/LOGO-header.svg';
import { Link } from 'react-router-dom';
import ComicPageAPI from '../../api/ComicPageAPI';
import pageData from '../../api/data/pagesData.json';
import MobileHeaderBackground from '../svgs/MobileHeaderBackground';
import HamburgerMenu from './HamburgerMenu';

import {COMIC_VIEWER_DEFAULT_PATH} from '../Main';

export default function MobileHeader(props) {
    let volNum = ComicPageAPI.getSeasonNum(pageData.maxDisplayPage);

    return (
        <div>
            <div className={`headerGrid w-full pt-3 pb-6 ${props.defaultBg ? "bg-cream-light": "bg-white"} ${props.defaultBg ? "lightHeaderBg" : "darkHeaderBg"} headerBg mobileHeaderBg`}>
                <div className="volDisplayMobile text-mocha-dark font-medium text-left ml-6 self-start">
                    <div className="volTextContainer flex flex-row w-full pt-3">
                        <div className="volText headerVolNum headerVolMobile">
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
                    <Link to={COMIC_VIEWER_DEFAULT_PATH}><img src={logo} width="170" /></Link>
                </div>
                <HamburgerMenu />
                
            </div>
            <div className={`publishDaysMobile text-mocha-dark self-end pb-2 font-medium h-full ${props.defaultBg ? "bg-white" : "bg-cream-dark"}`}>
                    <p>Updates every Monday</p>
                </div>
        </div>
    );
}