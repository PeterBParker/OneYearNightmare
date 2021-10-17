import BodyText from '../../generic/BodyText';
import IconLink from '../../generic/IconLink';

export default function ProfileCard(props) {

    return(
        <div>
            <hr className="border-eggshell border-2"/>
            <div className={`profileCardContainer pt-5 pb-8 ${props.isDesktop ? 'px-8' : 'px-6'}`}>
            
            <div className={`${props.isDesktop ? 'mb-6 desktopProfileCardHeader mt-2' : 'mb-3 profileCardHeader'}`}>
                <div className={`${props.isDesktop ? 'justify-self-left' : 'justify-self-center'} profileCardIcon`}>
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
            <div className={`${props.isDesktop ? 'text-lg' : ''} profileCardBody text-left`}>
                <BodyText text={props.content} />
            </div>
        </div>
        </div>
        
    )
}