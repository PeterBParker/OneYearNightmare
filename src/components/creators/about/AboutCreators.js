import ProfileCard from './ProfileCard';
import CardHeader from '../../generic/CardHeader';
import nathanProfileIcon from '../../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';
import morghanProfileIcon from '../../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';
import githubIcon from '../../../assets/Website Assets - Phase 1/SVG/icons8-github.svg';
import linkedinIcon from '../../../assets/Website Assets - Phase 1/SVG/icons8-linkedin.svg';
import facebookIcon from '../../../assets/Website Assets - Phase 1/SVG/icons8-facebook.svg';
import instagramIcon from '../../../assets/Website Assets - Phase 1/SVG/icons8-instagram.svg';

export default function AboutCreators() {

    return(
        <div className="aboutCreatorsContainer" >
            <CardHeader text="About the Creators"/>
            <ProfileCard pic={nathanProfileIcon} link1="https://www.linkedin.com/in/nathaneharris/" icon1={linkedinIcon} link2="https://github.com/PeterBParker" icon2={githubIcon} name="Nathan" role1="writer" role2="developer" content="This is me. I'm a dev." />
            <ProfileCard pic={morghanProfileIcon} link1="https://www.facebook.com/MoRayneArt/" icon1={facebookIcon} link2="https://www.instagram.com/mo.rayne.art/" icon2={instagramIcon} name="Morghan" role1="illustrator" role2="design" content="This is my wife. She's an artist." />
        </div>
    )
}