import SocialMediaShareButtons from "./SocialMediaShareButtons";
import monsterCat from '../../assets/Phase3-Assets1/1x/128x-MonsterCat.png';
import share from '../../assets/Phase3-Assets1/1x/90x-share.png';
export default function VerticalShare(props) {
    return (
        <div className="vertShare flex flex-col self-start">
            <img src={monsterCat} width={128} className="self-center"/>
            <SocialMediaShareButtons isVert={true} />
            <img src={share} width={90} className="self-center"/>
        </div>
        
    )
}