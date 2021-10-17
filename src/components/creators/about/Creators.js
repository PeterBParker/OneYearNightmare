import MobileAboutComic from './aboutCards/MobileAboutComic';
import DesktopAboutComic from './aboutCards/DesktopAboutComic';

import nathanProfileIcon from '../../../assets/Phase2-Assets1/images/profile-pic-N3.jpg';
import morghanProfileIcon from '../../../assets/Phase2-Assets1/images/profile-pic-M3.jpg';
import githubIcon from '../../../assets/Phase3-Assets1/1x/32x-dark-cat.png';
import linkedinIcon from '../../../assets/Phase3-Assets1/1x/32x-dark-twitter.png';
import facebookIcon from '../../../assets/Phase3-Assets1/1x/32x-dark-fb.png';
import instagramIcon from '../../../assets/Phase3-Assets1/1x/32x-dark-IG.png';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

export default function Creators() {
    const isDesktop = useMediaQuery({query: querySizes['lg']});
    let nathanAbout = "I love all things made from a marinade of mystery, a couple cups of comedy, and a quick whisk of wonder. I do backend python development during the day, dream up stories by night, and in the evenings in-between I work on this website. My favorite authors include Neil Gaiman, G.K. Chesterton, and Terry Prachett, and the Paranatural webcomic sparked the dream to write a webcomic of my own."
    let morghanAbout = "I like to draw. :)"
    let comicText = "Monsters and Myriads is a midwestern exploration into the spooky fantastic that haunts closed arcades, moon-frosted cornfields, and shadowed school hallways. Inspired by stories like Stranger Things, Gravity Falls, and Coraline, a group of incongruous highschoolers band together to uncover a gothic conspiracy that threatens to unravel their school, town, and world."

    let nathanLink1 = "https://twitter.com/harrihaven2"
    let nathanLink2 = "https://github.com/PeterBParker"
    let morghanLink1 = "https://www.facebook.com/MoRayneArt/"
    let morghanLink2 = "https://www.instagram.com/mo.rayne.art/"

    let nathanName = "Nathan"
    let morghanName = "Morghan"
    let nathanRole1 = "writer"
    let nathanRole2 = "developer"
    let morghanRole1 = "illustrator"
    let morghanRole2 = "designer"

    return(
        isDesktop? 
            <DesktopAboutComic nathanAbout={nathanAbout} morghanAbout={morghanAbout} comicText={comicText} nathanProfileIcon={nathanProfileIcon} morghanProfileIcon={morghanProfileIcon}
                githubIcon={githubIcon} linkedinIcon={linkedinIcon} facebookIcon={facebookIcon} instagramIcon={instagramIcon} nathanName={nathanName} nathanRole1={nathanRole1} nathanRole2={nathanRole2}
                nathanLink1={nathanLink1} nathanLink2={nathanLink2} morghanName={morghanName} morghanLink1={morghanLink1} morghanLink2={morghanLink2} morghanRole1={morghanRole1} morghanRole2={morghanRole2}/>
        :
            <MobileAboutComic nathanAbout={nathanAbout} morghanAbout={morghanAbout} comicText={comicText} nathanProfileIcon={nathanProfileIcon} morghanProfileIcon={morghanProfileIcon}
                githubIcon={githubIcon} linkedinIcon={linkedinIcon} facebookIcon={facebookIcon} instagramIcon={instagramIcon} nathanName={nathanName} nathanRole1={nathanRole1} nathanRole2={nathanRole2}
                nathanLink1={nathanLink1} nathanLink2={nathanLink2} morghanName={morghanName} morghanLink1={morghanLink1} morghanLink2={morghanLink2} morghanRole1={morghanRole1} morghanRole2={morghanRole2}/>
    );
}