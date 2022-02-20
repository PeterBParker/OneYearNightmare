import ProfileCard from '../ProfileCard';
import CardHeader from '../../../generic/CardHeader';

export default function DesktopAboutCreators(props) {
    return (
        <div className="desktopAboutCreatorsContainer mx-auto mb-24" >
            <CardHeader text="About the Creators" isDesktop={true} />
            <div className="desktopAboutCreatorsProfiles">
                <div className="lightBorder rightBorder">
                    <ProfileCard isDesktop={true} pic={props.nathanProfileIcon} link1={props.nathanLink1} icon1={props.linkedinIcon} link2={props.nathanLink2} 
                        icon2={props.githubIcon} name={props.nathanName} role1={props.nathanRole1} role2={props.nathanRole2} content={props.nathanAbout} shouldFade={false} />
                </div>
                <div className="lightBorder leftBorder">
                    <ProfileCard isDesktop={true} pic={props.morghanProfileIcon} link1={props.morghanLink1} icon1={props.facebookIcon} link2={props.morghanLink2} 
                        icon2={props.instagramIcon} name={props.morghanName} role1={props.morghanRole1} role2={props.morghanRole2} content={props.morghanAbout} shouldFade={false}/>
                </div>

            </div>

        </div>
    )
}