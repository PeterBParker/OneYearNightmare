import Title from './Title';
import BodyText from './BodyText';
import tipjarSvg from '../../assets/Website Assets - Phase 1/SVG/ILLO-tipjar.svg';
import patreonSvg from '../../assets/Website Assets - Phase 1/SVG/icons8-patreon.svg';
import bmacSvg from '../../assets/Website Assets - Phase 1/PNG/taco.png';

export default function SupportUsCard() {
    return (
        <div className="supportUsContainer mb-6">
            <div className="title py-6 px-6 bg-eggshell text-left">
                <Title text="Support" />
                <br/>
                <Title text="the Comic //" />
            </div>
            <div className="body px-6 py-6 inline-block relative">
                <div className="text-left w-3/5 float-left">
                    <BodyText text="Thank you for reading our comic! This is what we love to do and 
                        sharing that with you is a dream. Check out some ways you can help out below." />
                </div>
                <div className="tipJarIllo float-right absolute right-4 -top-12">
                    <a href="https://www.buymeacoffee.com/rayell"><img src={tipjarSvg} width={115} /></a>
                </div>
            </div>
            <div className="iconList flex flex-row px-6">
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