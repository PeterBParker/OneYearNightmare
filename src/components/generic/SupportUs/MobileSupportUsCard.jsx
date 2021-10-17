import Title from '../Title';
import BodyText from '../BodyText';
import patreonSvg from '../../../assets/Website Assets - Phase 1/SVG/icons8-patreon.svg';
import bmacSvg from '../../../assets/Website Assets - Phase 1/PNG/taco.png';

export default function MobileSupportUsCard(props) {
    return (
        <div className="mobileSupportUsContainer mb-6">
            <div className="supportUsTitle py-6 px-6 bg-eggshell text-left">
                <Title text="Support" />
                <br/>
                <Title text="the Comic //" />
            </div>
            <div className="supportUsBody px-6 py-6 inline-block relative grid">
                <div className="text-left self-center">
                    <BodyText text={props.supportUsText} />
                </div>
            </div>
            <div className="tipJarIllo supportUsTipJar self-center justify-self-end">
                    <a href="https://www.buymeacoffee.com/nate_and_mo"><img src={props.supportImage} width={115} /></a>
            </div>
            <div className="iconList supportUsCardLinks flex flex-row px-6 self-end pt-4">
                <div className="patreonLink mr-4">
                    <a href="https://www.patreon.com/nate_and_mo"><img src={props.patreonIcon} width={50}/></a>
                </div>
                <div className="bmacLink mr-4">
                    <a href="https://www.buymeacoffee.com/nate_and_mo"><img src={props.tipIcon} width={50}/></a>
                </div>
                <div className="discordLink">
                    <a href="https://discord.gg/47DQVUnbD6"><img src={props.discordIcon} width={50}/></a>
                </div>
            </div>
        </div>
    )
}