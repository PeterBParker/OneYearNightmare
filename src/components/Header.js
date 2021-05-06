import { Link, useParams } from 'react-router-dom';
import { COMIC_VIEWER_DEFAULT_PATH } from './Main';
import logo from '../assets/Website Assets - Phase 1/SVG/LOGO-header.svg';
import menuIcon from '../assets/Website Assets - Phase 1/SVG/MOBILE-sandwhich-menu.svg';
import background from '../assets/Website Assets - Phase 1/SVG/MOBILE-header.svg'
import ComicPageAPI from '../api/ComicPageAPI';
import pageData from '../api/data/pagesData.json';

export default function Header() {
    let volNum = ComicPageAPI.getSeasonNum(pageData.pageCount);
    return (
        <div>
            <div className="navbar">
                    <div className="comicViewerNavLink">
                        <Link to={COMIC_VIEWER_DEFAULT_PATH}>read</Link>
                    </div>
                    <div className="creatorsNavLink">
                        <Link to='/creatives'>about us</Link>
                    </div>
                    <div className="supportNavLink">
                        <Link to='/support'>support us</Link>
                    </div>
            </div>
            <div className="headerGrid w-full pt-3">
                <div className="volDisplayMobile text-mocha-dark font-medium text-left ml-6 self-start">
                    <div className="volTextContainer flex flex-row w-full pt-3">
                        <div className="volText headerVolNum">
                            vol
                        </div>
                        <div className="volNumContainer ml-2">
                            <svg width="32px" height="32px">
                                <g>
                                    <circle cx="14" cy="14"  r="13" stroke-width="2" stroke="#998f7e" fill-opacity="0%"></circle>
                                    <text x="14" y="14" fill="#998f7e" className="headerVolNum" text-anchor="middle" alignment-baseline="central">{volNum}</text>
                                </g>
                            </svg>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="headerLogoMobile justify-self-center self-start">
                    <img src={logo} width="170" />
                </div>
                <div className="navMenuMobile ml-auto mr-6">
                    <img src={menuIcon} width={42} />
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