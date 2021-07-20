import Header from '../../header/Header';
import IconCard from '../../generic/IconCard';

import patreonIcon from '../../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';
import buyUsACoffeeIcon from '../../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';

export default function SupportMobile(props) {

    return(
        <div className="supportPage">
            <Header defaultBg={true}/>
            <IconCard icon={patreonIcon} title="Patreon" body={props.patreonBody} link="https://www.patreon.com/" linkText="join the gang" isDesktop={false}/>
            <IconCard icon={buyUsACoffeeIcon} title="Buy Us a Coffee" body={props.buyusacoffeeBody} link="https://www.buymeacoffee.com/rayell" linkText="feed us, pls" isDesktop={false} />
        </div>
    );
}