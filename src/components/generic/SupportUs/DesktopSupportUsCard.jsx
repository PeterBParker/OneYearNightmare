import Title from '../Title';
import BodyText from '../BodyText';
import tipjarSvg from '../../../assets/Website Assets - Phase 1/SVG/ILLO-tipjar.svg';
import patreonSvg from '../../../assets/Website Assets - Phase 1/SVG/icons8-patreon.svg';
import bmacSvg from '../../../assets/Website Assets - Phase 1/PNG/taco.png';

export default function DesktopSupportUsCard() {
    return (
        <div className="desktopSupportUsContainer supportUsContainer mb-6">
            <div className="supportUsTitle py-4 px-8 bg-eggshell text-left flex flex-row items-center">
                <Title text="Support the Comic //" />
            </div>
            <div className="supportUsBody px-8 py-4 inline-block relative flex">
                <div className="text-left float-left text-lg">
                    <BodyText text="Thank you for reading our comic! This is what we love to do and 
                        sharing that with you is a dream. Check out some ways you can help out below." />
                </div>
            </div>
            <div className="tipJarIllo supportUsTipJar self-start pt-10 pr-4">
                    <a href="https://www.buymeacoffee.com/rayell"><img src={tipjarSvg} width={160} /></a>
            </div>
            <div className="iconList supportUsCardLinks flex flex-row px-6 pb-4">
                <div className="patreonLink mr-2">
                    <a href="https://www.patreon.com/"><img src={patreonSvg} width={50}/></a>
                </div>
                <div className="bmacLink mr-2">
                    <a href="https://www.buymeacoffee.com/rayell"><img src={bmacSvg} width={50}/></a>
                </div>
            </div>
        </div>
    )
}