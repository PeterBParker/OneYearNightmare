import ProfileCard from './ProfileCard';
import CardHeader from '../../generic/CardHeader';
import nathanProfileIcon from '../../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';
import morghanProfileIcon from '../../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';
import nathanIcon1 from '../../../assets/Website Assets - Phase 1/SVG/FILLER-icon.svg';
import nathanIcon2 from '../../../assets/Website Assets - Phase 1/SVG/FILLER-icon.svg';
import morghanIcon1 from '../../../assets/Website Assets - Phase 1/SVG/FILLER-icon.svg';
import morghanIcon2 from '../../../assets/Website Assets - Phase 1/SVG/FILLER-icon.svg';

export default function AboutCreators() {

    return(
        <div className="aboutCreatorsContainer" >
            <CardHeader text="About the Creators"/>
            <ProfileCard pic={nathanProfileIcon} link1="https://www.linkedin.com/in/nathaneharris/" icon1={nathanIcon1} link2="https://github.com/PeterBParker" icon2={nathanIcon2} name="Nathan" role1="writer" role2="developer" content="This is me. I'm a dev." />
            <ProfileCard pic={morghanProfileIcon} link1="https://www.facebook.com/MoRayneArt/" icon1={morghanIcon1} link2="" icon2={morghanIcon2} name="Morghan" role1="illustrator" role2="design" content="This is my wife. She's an artist." />
        </div>
    )
}