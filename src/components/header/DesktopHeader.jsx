import logo from '../../assets/Website Assets - Phase 1/SVG/LOGO-header.svg';
import { Link } from 'react-router-dom';
import ComicPageAPI from '../../api/ComicPageAPI';
import pageData from '../../api/data/pagesData.json';


import { COMIC_VIEWER_DEFAULT_PATH } from '../Main';

export default function DesktopHeader(props) {
    let volNum = 1;

    return (
        <div>

            <div className={`headerGridDesktop items-center w-full`}>
                <div className="headerContentDesktop flex flex-row items-center justify-center ">
                    <div className={`publishDaysDesktop text-mocha-dark self-center font-medium justify-self-end mr-6 text-xl flex-shrink-0`}>
                        <p className="publishDaysTextDesktop">mon | thur</p>
                    </div>
                    <div className="headerLogoDesktop justify-self-center self-center py-7 px-4 flex-shrink-0">
                        <Link to={COMIC_VIEWER_DEFAULT_PATH}><img className="headerLogoImageDesktop mx-auto" src={logo} width="200px" height="auto" /></Link>
                    </div>
                    <div className="volDisplayDesktop text-mocha-dark font-medium text-left ml-6 self-center justify-self-start">
                        <div className="volTextContainer flex flex-row w-full">
                            <div className="volText headerVolNumDesktop text-xl">
                                volume
                            </div>
                            <div className="volNumContainer ml-2 flex-shrink-0">
                                <svg width="32px" height="32px">
                                    <g>
                                        <circle cx="14" cy="14" r="13" strokeWidth="2" stroke="#998f7e" fillOpacity="0%"></circle>
                                        <text x="14" y="20" fill="#998f7e" className="headerVolNum" textAnchor="middle" alignmentBaseline="central">{volNum}</text>
                                    </g>
                                </svg>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}