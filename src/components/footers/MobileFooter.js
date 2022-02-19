import logo from '../../assets/Website Assets - Phase 1/SVG/LOGO-footer.svg'
import discordIcons from '../../assets/FINAL-ASSETS-072821/final assets/discord-banner-illo.png';
import facebookIcon from '../../assets/Phase3-Assets1/1x/32x-footer-FB.png';
import instagramIcon from '../../assets/Phase3-Assets1/1x/32x-footer-IG.png';
import twitterIcon from '../../assets/Phase3-Assets1/1x/32x-footer-twitter.png';
import {Link} from 'react-router-dom';

export default function MobileFooter() {
   
    return (
        <div className="footerWrapper footer bg-grey-light">
            <div className="footerLinksAndLogo py-6 px-6 ">
                <div className="logo pb-3 w-full place-content-center">
                    <img src={logo} width="220" className="mx-auto" alt="Monsters and Myriads logo"/>
                </div>
                <hr className="border-mocha-light"/>
                <div className="links pt-3 px-2 footerMobileGrid w-full">
                        <div className="discordIcons self-center discordLinkContainerGrid">
                            <a href="https://discord.gg/47DQVUnbD6">
                                <img src={discordIcons} width="110" alt="discord icon"/>
                            </a>
                        </div>
                        <div className="readLinkGrid text-green text-lg">
                            <Link to={'/read/'}>read</Link>
                        </div>
                        <div className="aboutLinkGrid text-green text-lg">
                            <Link to={'/creatives'}>about</Link>
                        </div>
                        <span className="supportLinkGrid text-green text-lg">
                            <Link to={'/support'}>support</Link>
                        </span>
                    <div className="socialMediaLinks socialMediaFooterGrid grid grid-cols-2 grid-rows-2">
                        <div className="facebookIcon justify-start self-end">
                            <a href="https://www.facebook.com/thatmidwesternmonstercomic/">
                                <img src={facebookIcon} width={32} className="ml-auto mr-1 " alt="facebook icon"/>
                            </a>
                        </div>
                        <div className="twitterIcon justify-content-center self-end">
                            <a href="https://twitter.com/monxmyr"><img src={twitterIcon} width={32} className="mr-auto ml-1" alt="twitter icon"/></a>
                        </div>
                        <div className="instagramIcon col-span-2 justify-self-center mt-1">
                            <a href="https://www.instagram.com/monxmyr/"><img src={instagramIcon} width={32} className="mx-auto" alt="instagram icon"/></a>
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