import logo from '../../assets/Website Assets - Phase 1/SVG/LOGO-footer.svg'
import discordIcons from '../../assets/Website Assets - Phase 1/SVG/FOOTER-patreon-discord.svg';

import { Link } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';

export default function DesktopFooter(props) {
    const isExtraWide = useMediaQuery({ query: querySizes['xl'] });
    const xlDiscordText = <p>Join the fun on<br /> our Discord!</p>

    return (
        <div className="desktopFooterWrapper bg-grey-light">
            <div className="desktopFooterLinksAndLogo py-6 px-8 items-center">

                <div className="desktopFooterLogo">
                    <span className="centerVertImageHelper"></span><img src={logo} width="375" className="mr-auto" />
                </div>

                <div className="desktopFooterLinks flex flex-row flex flex-row justify-around items-center">
                    <div className="desktopDiscordFooter flex flex-row justify-start items-center mx-6">
                        <div className={`discordCall font-body text-mocha-light text-xl text-left discordTextGrid`}>
                            {isExtraWide ? xlDiscordText : ""}
                        </div>
                        <div className="discordIcons ml-6 ">
                            <img src={discordIcons} width="120" />
                        </div>
                    </div>

                    <div className="footerVertLine" />

                    <div className="desktopFooterPageLinks text-xl font-body font-medium mx-6">
                        <div className="text-green footerNavLink">
                            <Link to={'/read/'}>read</Link>
                        </div>
                        <div className="text-green footerNavLink">
                            <Link to={'/creatives'}>about</Link>
                        </div>
                        <span className="text-green footerNavLink">
                            <Link to={'/support'}>support</Link>
                        </span>
                    </div>

                    <div className="footerVertLine" />

                    <div className="desktopFooterSocialMediaLinks flex flex-row items-center ml-6">
                        <div className="text-xl font-body text-mocha-light mr-6">Follow us:</div>
                        <div className="facebookIcon mr-4 flex-shrink-0 footerNavLink">
                            <a href="https://www.facebook.com/MoRayneArt/"><img src={props.facebookIcon} width={32} className=" " /></a>
                        </div>
                        <div className="twitterIcon mr-4 flex-shrink-0 footerNavLink">
                            <a href=""><img src={props.twitterIcon} width={32} /></a>
                        </div>
                        <div className="instagramIcon mr-4 flex-shrink-0 footerNavLink">
                            <a href="https://www.instagram.com/mo.rayne.art/"><img src={props.instagramIcon} width={32} /></a>
                        </div>
                    </div>
                </div>


            </div>
            <div className="copyrightWrapper w-full bg-grey-dark">
                <div className="copyright text-sm text-mocha-dark font-body py-3 px-6 md:text-left md:text-base md:px-12">© 2021 Nathan and Morghan Harris.</div>
            </div>
        </div>
    )
}