import logo from '../../assets/Website Assets - Phase 1/SVG/LOGO-header.svg';
import ComicPageAPI from '../../api/ComicPageAPI';
import pageData from '../../api/data/pagesData.json';
import MobileHeaderBackground from '../svgs/MobileHeaderBackground';

export default function DesktopHeader(props) {
    let volNum = ComicPageAPI.getSeasonNum(pageData.pageCount);

    return (
        <div>
            <div className={`headerGridDesktop items-center w-full pt-3 ${props.defaultBg ? "bg-cream-light" : "bg-white"}`}>
            <div className="farmHeaderBackground pt-10">
                    <div className="self-end">
                        <MobileHeaderBackground color={`${props.defaultBg ? "#fff" : "#e0dcd1"}`} />
                    </div>

                </div>
                <div className="headerContentDesktop items-center">
                    <div className={`publishDaysDesktop text-mocha-dark self-center font-medium justify-self-end mr-3 text-xl`}>
                        <p>mon | thur</p>
                    </div>
                    <div className="headerLogoDesktop justify-self-center self-start p-7">
                        <img className="headerLogoImageDesktop" src={logo} width="300px" height="auto"/>
                    </div>
                    <div className="volDisplayDesktop text-mocha-dark font-medium text-left ml-6 self-center justify-self-start">
                        <div className="volTextContainer flex flex-row w-full">
                            <div className="volText headerVolNumDesktop text-xl">
                                volume
                        </div>
                            <div className="volNumContainer ml-2 ">
                                <svg width="32px" height="32px">
                                    <g>
                                        <circle cx="14" cy="14" r="13" strokeWidth="2" stroke="#998f7e" fillOpacity="0%"></circle>
                                        <text x="14" y="14" fill="#998f7e" className="headerVolNum" textAnchor="middle" alignmentBaseline="central">{volNum}</text>
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