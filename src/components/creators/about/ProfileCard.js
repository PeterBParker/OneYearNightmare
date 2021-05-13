import BodyText from '../../generic/BodyText';
import IconLink from '../../generic/IconLink';

export default function ProfileCard(props) {
    let bodyText="This is a note from the creator. Of things yet\
    unsaid. And things to be discovered. Really\
    just things to speak and understand of the\
    bandanna that kicks feelings. It’s hard to be\
    cool when you wear a blue sweater with stars."

    return(
        <div>
            <hr className="border-eggshell border-2"/>
            <div className="profileCardContainer pt-5 pb-8 px-6">
            
            <div className="profileCardHeader mb-3">
                <div className="profileCardIcon justify-self-center">
                    <img src={props.pic} width={110} />
                </div>
                <div className="profileLinkIcons flex flex-row space-x-2">
                    <IconLink link={props.link1} icon={props.icon1} />
                    <IconLink link={props.link2} icon={props.icon2} />
                </div>
                <div className="profileNameHeader font-header text-grey-light text-3xl font-bold text-left">
                    <p>{props.name}</p>
                </div>
                <div className="profileRolesHeader text-left">
                    <p className="inline">{props.role1}</p> <p className="inline text-mocha-light">|</p> <p className="inline">{props.role2}</p>
                </div>
            </div>
            <div className="profileCardBody text-left">
                <BodyText text={bodyText} />
            </div>
        </div>
        </div>
        
    )
}