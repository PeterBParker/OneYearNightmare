import ProfileCard from '../ProfileCard';
import CardHeader from '../../../generic/CardHeader';

export default function MobileAboutCreators(props) {

    return(
        <div className="aboutCreatorsContainer" >
            <CardHeader text="About the Creators" isDesktop={false}/>
            <ProfileCard isDesktop={false} pic={props.nathanProfileIcon} link1={props.nathanLink1} icon1={props.linkedinIcon} link2={props.nathanLink2} 
                        icon2={props.githubIcon} name={props.nathanName} role1={props.nathanRole1} role2={props.nathanRole2} content={props.nathanAbout} shouldFade={false}/>
            <ProfileCard isDesktop={false} pic={props.morghanProfileIcon} link1={props.morghanLink1} icon1={props.facebookIcon} link2={props.morghanLink2} 
                icon2={props.instagramIcon} name={props.morghanName} role1={props.morghanRole1} role2={props.morghanRole2} content={props.morghanAbout} shouldFade={true} addMarginBottom={true}/>
        </div>
    )
}