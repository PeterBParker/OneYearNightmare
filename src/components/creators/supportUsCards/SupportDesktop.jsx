import Header from '../../header/Header';
import IconCard from '../../generic/IconCard';
import SimpleNavBar from '../../comics/navigation/desktop/SimpleNavBar';
import Pages from '../../comics/navigation/desktop/Pages';
import patreonIcon from '../../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';
import buyUsACoffeeIcon from '../../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';

export default function SupportDesktop(props) {

    return(
        <div className="desktopDefaultBg pb-24">
            <Header defaultBg={true}/>
            <SimpleNavBar page={Pages.SUPPORT}/>
            <div className="supportCards mt-8">
                <div className="childSupportCard patreonSupportCard bg-white" id="patreonSupportCard">
                    <IconCard icon={patreonIcon} title="Patreon" body={props.patreonBody} link="https://www.patreon.com/" linkText="join the gang" isDesktop={true}/>
                </div>
                <div className="childSupportCard buyusacoffeeSupportCard bg-white" id="buyusacoffeeSupportCard">
                    <IconCard icon={buyUsACoffeeIcon} title="Buy Us a Coffee" body={props.buyusacoffeeBody} link="https://www.buymeacoffee.com/rayell" linkText="feed us, pls" isDesktop={true}/>
                </div>  
            </div>
        </div>
    );
}