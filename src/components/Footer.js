import InstagramTag from './generic/InstagramTag';
import BuyMeACoffeeTag from './generic/BuyMeACoffeeTag';
import logo from '../assets/Website Assets - Phase 1/SVG/LOGO-footer.svg'
import discordIcons from '../assets/Website Assets - Phase 1/SVG/FOOTER-patreon-discord.svg';
import facebookIcon from '../assets/Website Assets - Phase 1/SVG/FOOTER-fb.svg';
import instagramIcon from '../assets/Website Assets - Phase 1/SVG/FOOTER-instagram.svg';
import twitterIcon from '../assets/Website Assets - Phase 1/SVG/FOOTER-twitter.svg';
import {Link} from 'react-router-dom';

export default function Footer() {
    return (
        <div className="footerWrapper bg-grey-light">
            <div className="footerLinksAndLogo py-6 px-6 ">
                <div className="logo pb-3 w-full place-content-center">
                    <img src={logo} width="220" className="mx-auto"/>
                </div>
                <hr className="border-mocha-light"/>
                <div className="links pt-3 px-2 flex flex-row w-full">
                    <div className="discordCallContainer flex flex-col content-between w-2/6 items-end">
                        <div className="discordCall text-mocha-light text-sm text-left">
                            <p>Join the fun on our Discord!</p>
                        </div>
                        <div className="discordIcons self-end ">
                            <img src={discordIcons} width="120" />
                        </div>
                    </div>
                    <div className="websiteLinkContainer flex flex-wrap flex-col w-2/6 text-lg text-green">
                        <div className="mb-1 align-baseline">
                            <Link to={'/read/'}>read</Link>
                        </div>
                        <div className="mb-1">
                            <Link to={'/creatives'}>about</Link>
                        </div>
                        <span className="align-baseline">
                            <Link to={'/support'}>support</Link>
                        </span>
                    </div>
                    <div className="socialMediaLinks grid grid-cols-2 grid-rows-2 w-2/6">
                        <div className="facebookIcon justify-start self-end">
                            <a href=""><img src={facebookIcon} width={32} className="ml-auto mr-1 "/></a>
                        </div>
                        <div className="twitterIcon justify-content-center self-end">
                            <a href=""><img src={twitterIcon} width={32} className="mr-auto ml-1"/></a>
                        </div>
                        <div className="instagramIcon col-span-2 justify-self-center mt-1">
                            <a href="https://www.instagram.com/mo.rayne.art/"><img src={instagramIcon} width={32} className="mx-auto"/></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyrightWrapper w-full bg-grey-dark">
                <div className="copyright text-sm text-mocha-dark font-body py-3 px-6">© 2021 Nathan and Morghan Harris.</div>
            </div>
        </div>
    )
}