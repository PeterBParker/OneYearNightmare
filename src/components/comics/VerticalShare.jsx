import SocialMediaShareButtons from "./SocialMediaShareButtons";
import monsterCat from '../../assets/Phase2-Assets1/images/MonsterCat2.png';
export default function VerticalShare(props) {
    return (
        <div className="vertShare flex flex-col self-start">
            <img src={monsterCat} width={128} className="self-center"/>
            <SocialMediaShareButtons isVert={true} />
        </div>
        
    )
}