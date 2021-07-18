import ProfileCard from '../ProfileCard';
import CardHeader from '../../../generic/CardHeader';
import nathanProfileIcon from '../../../../assets/Phase2-Assets1/images/profile-pic-N3.jpg';
import morghanProfileIcon from '../../../../assets/Phase2-Assets1/images/profile-pic-M3.jpg';
import githubIcon from '../../../../assets/Phase2-Assets1/images/dark-cat.png';
import linkedinIcon from '../../../../assets/Phase2-Assets1/images/dark-twitter.png';
import facebookIcon from '../../../../assets/Phase2-Assets1/images/dark-fb.png';
import instagramIcon from '../../../../assets/Phase2-Assets1/images/dark-IG.png';

export default function DesktopAboutCreators() {

    return (
        <div className="desktopAboutCreatorsContainer mx-auto mb-24" >
            <CardHeader text="About the Creators" isDesktop={true} />
            <div className="desktopAboutCreatorsProfiles">
                <div className="lightBorder rightBorder">
                    <ProfileCard isDesktop={true} pic={nathanProfileIcon} link1="https://www.linkedin.com/in/nathaneharris/" icon1={linkedinIcon} link2="https://github.com/PeterBParker" icon2={githubIcon} name="Nathan" role1="writer" role2="developer" content="This is me. I'm a dev." />
                </div>
                <div className="lightBorder leftBorder">
                    <ProfileCard isDesktop={true} pic={morghanProfileIcon} link1="https://www.facebook.com/MoRayneArt/" icon1={facebookIcon} link2="https://www.instagram.com/mo.rayne.art/" icon2={instagramIcon} name="Morghan" role1="illustrator" role2="design" content="This is my wife. She's an artist." />
                </div>

            </div>

        </div>
    )
}