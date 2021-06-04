import Title from '../Title';
import BodyText from '../BodyText';
import tipjarSvg from '../../../assets/Website Assets - Phase 1/SVG/ILLO-tipjar.svg';
import patreonSvg from '../../../assets/Website Assets - Phase 1/SVG/icons8-patreon.svg';
import bmacSvg from '../../../assets/Website Assets - Phase 1/PNG/taco.png';

export default function MobileSupportUsCard() {
    return (
        <div className="mobileSupportUsContainer mb-6">
            <div className="supportUsTitle py-6 px-6 bg-eggshell text-left">
                <Title text="Support" />
                <br/>
                <Title text="the Comic //" />
            </div>
            <div className="supportUsBody px-6 py-6 inline-block relative grid">
                <div className="text-left self-center">
                    <BodyText text="Thank you for reading our comic! This is what we love to do and 
                        sharing that with you is a dream. Check out some ways you can help out below." />
                </div>
            </div>
            <div className="tipJarIllo supportUsTipJar self-center justify-self-center pr-4">
                    <a href="https://www.buymeacoffee.com/rayell"><img src={tipjarSvg} width={115} /></a>
            </div>
            <div className="iconList supportUsCardLinks flex flex-row px-6 self-end">
                <div className="patreonLink mr-2">
                    <a href="https://www.patreon.com/"><img src={patreonSvg} width={32}/></a>
                </div>
                <div className="bmacLink mr-2">
                    <a href="https://www.buymeacoffee.com/rayell"><img src={bmacSvg} width={32}/></a>
                </div>
            </div>
        </div>
    )
}