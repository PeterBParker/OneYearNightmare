import SocialMediaShareButtons from "./SocialMediaShareButtons";
import monsterCat from '../../assets/Phase3-Assets1/1x/128x-MonsterCat.png';
import share from '../../assets/Phase3-Assets1/1x/90x-share.png';
export default function VerticalShare(props) {
    return (
        <div className="vertShare flex flex-col self-start">
            <img src={monsterCat} width={128} className="self-center" alt=""/>
            <SocialMediaShareButtons isVert={true} sharePageUrl={props.sharePageUrl} title={props.title} shareImageUrl={props.shareImageUrl}/>
            <img src={share} width={90} className="self-center" alt=""/>
        </div>
        
    )
}