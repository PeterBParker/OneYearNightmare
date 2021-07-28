import Header from '../../header/Header';
import IconCard from '../../generic/IconCard';

import patreonIcon from '../../../assets/FINAL-ASSETS-072821/final assets/fill-white-patreon-120px.png';
import custardIcon from '../../../assets/FINAL-ASSETS-072821/final assets/fill-white-custard-120px.png';

export default function SupportMobile(props) {

    return(
        <div className="supportPage">
            <Header defaultBg={true}/>
            <IconCard icon={patreonIcon} title="Patreon" body={props.patreonBody} link="https://www.patreon.com/" linkText="join the gang" isDesktop={false}/>
            <IconCard icon={custardIcon} title="Buy Us a Custard" body={props.buyusacoffeeBody} link="https://www.buymeacoffee.com/rayell" linkText="feed us, pls" isDesktop={false} />
        </div>
    );
}