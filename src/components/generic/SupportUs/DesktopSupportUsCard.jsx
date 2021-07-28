import Title from '../Title';
import BodyText from '../BodyText';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';

export default function DesktopSupportUsCard(props) {
    const bigEnough = useMediaQuery({query: querySizes['xl']});
    let supportImageContainer = ''
    if (bigEnough) {
        supportImageContainer = <div className="tipJarIllo supportUsTipJar self-end pb-20">
            <a href="https://www.buymeacoffee.com/rayell"><img src={props.supportImage} width={"100%"} /></a>
            </div>
    }
    return (
        <div className={` ${bigEnough? 'supportUsBigEnoughContainer' : 'supportUsTooSmallContainer'} desktopSupportUsContainer supportUsContainer mb-6`}>
            <div className="supportUsTitle py-4 px-8 bg-eggshell text-left flex flex-row items-center">
                <Title text="Support Us //" />
            </div>
            <div className="supportUsBody px-8 py-4 inline-block relative flex">
                <div className="text-left float-left text-lg">
                    <BodyText text={props.supportUsText} />
                </div>
            </div>
            {supportImageContainer}
            <div className="iconList supportUsCardLinks flex flex-row px-6 pb-4 items-end">
                <div className="patreonLink mr-4">
                    <a href="https://www.patreon.com/"><img src={props.patreonIcon} onMouseOver={() => props.changePatreon(props.patreonActive)} onMouseLeave={() => props.changePatreon(props.patreonInactive)} width={50}/></a>
                </div>
                <div className="bmacLink mr-2">
                    <a href="https://www.buymeacoffee.com/rayell"><img src={props.tipIcon} onMouseOver={() => props.changeTip(props.tipActive)} onMouseLeave={() => props.changeTip(props.tipInactive)} width={50}/></a>
                </div>
            </div>
        </div>
    )
}