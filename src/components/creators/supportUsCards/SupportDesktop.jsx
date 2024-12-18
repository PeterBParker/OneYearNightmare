import IconCard from '../../generic/IconCard';
import patreonIcon from '../../../assets/FINAL-ASSETS-072821/final assets/fill-white-patreon-180px.png';
import custardIcon from '../../../assets/FINAL-ASSETS-072821/final assets/fill-white-custard-180px.png';

export default function SupportDesktop(props) {

    return(
        <div className="pb-24">
            <div className="supportCards mt-8">
                <div className="childSupportCard patreonSupportCard bg-white" id="patreonSupportCard">
                    <IconCard icon={patreonIcon} title="Patreon" body={props.patreonBody} link="https://www.patreon.com/nate_and_mo" linkText="join the gang" isDesktop={true}/>
                </div>
                <div className="childSupportCard buyusacoffeeSupportCard bg-white" id="buyusacoffeeSupportCard">
                    <IconCard icon={custardIcon} title="Buy Us a Custard" body={props.buyusacoffeeBody} link="https://www.buymeacoffee.com/nate_and_mo" linkText="feed us, pls" isDesktop={true}/>
                </div>  
            </div>
        </div>
    );
}