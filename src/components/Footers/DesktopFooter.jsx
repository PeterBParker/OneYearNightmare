import InstagramTag from '../generic/InstagramTag';
import BuyMeACoffeeTag from '../generic/BuyMeACoffeeTag';
import logo from '../../assets/Website Assets - Phase 1/SVG/LOGO-footer.svg'
import discordIcons from '../../assets/Website Assets - Phase 1/SVG/FOOTER-patreon-discord.svg';
import facebookIcon from '../../assets/Website Assets - Phase 1/SVG/FOOTER-fb.svg';
import instagramIcon from '../../assets/Website Assets - Phase 1/SVG/FOOTER-instagram.svg';
import twitterIcon from '../../assets/Website Assets - Phase 1/SVG/FOOTER-twitter.svg';
import { Link } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';

export default function DesktopFooter() {
    return (
        <div className="desktopFooterWrapper bg-grey-light">
            <div className="desktopFooterLinksAndLogo py-6 px-12 flex flex-row justify-between items-center">

                <div className="logo">
                    <span className="centerVertImageHelper"></span><img src={logo} width="375" className="mx-auto" />
                </div>

                <div className="desktopDiscordFooter flex flex-row justify-start items-center mx-6">
                    <div className="discordCall font-body text-mocha-light text-xl text-left discordTextGrid ml-6">
                        <p>Join the fun on<br/> our Discord!</p>
                    </div>
                    <div className="discordIcons ml-6 flex-shrink-0">
                        <img src={discordIcons} width="120" />
                    </div>
                </div>

                <div className="footerVertLine" />

                <div className="desktopFooterPageLinks text-xl font-body font-medium mx-6">
                    <div className="text-green">
                        <Link to={'/read/'}>read</Link>
                    </div>
                    <div className="text-green">
                        <Link to={'/creatives'}>about</Link>
                    </div>
                    <span className="text-green">
                        <Link to={'/support'}>support</Link>
                    </span>
                </div>

                <div className="footerVertLine" />

                <div className="desktopFooterSocialMediaLinks flex flex-row items-center ml-6">
                    <div className="text-xl font-body text-mocha-light mr-6">Follow us:</div>
                    <div className="facebookIcon mr-4 flex-shrink-0">
                        <a href="https://www.facebook.com/MoRayneArt/"><img src={facebookIcon} width={32} className=" " /></a>
                    </div>
                    <div className="twitterIcon mr-4 flex-shrink-0">
                        <a href=""><img src={twitterIcon} width={32} className="" /></a>
                    </div>
                    <div className="instagramIcon mr-4 flex-shrink-0">
                        <a href="https://www.instagram.com/mo.rayne.art/"><img src={instagramIcon} width={32} className="" /></a>
                    </div>
                </div>

            </div>
            <div className="copyrightWrapper w-full bg-grey-dark">
                <div className="copyright text-sm text-mocha-dark font-body py-3 px-6 md:text-left md:text-base md:px-12">© 2021 Nathan and Morghan Harris.</div>
            </div>
        </div>
    )
}