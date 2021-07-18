import {
    FacebookShareButton,
    TwitterShareButton,
    TumblrShareButton,
    PinterestShareButton,
    EmailShareButton,
    EmailIcon,
} from "react-share";

import fbSvg from '../../assets/Website Assets - Phase 1/SVG/SM-fb.svg';
import twitterSvg from '../../assets/Website Assets - Phase 1/SVG/SM-twitter.svg';
import tumblrSvg from '../../assets/Website Assets - Phase 1/SVG/SM-tumblr.svg';
import pinterestSvg from '../../assets/Website Assets - Phase 1/SVG/SM-pinterest.svg';
import monsterCat from '../../assets/Phase2-Assets1/images/MonsterCat2.png';

export default function SocialMediaShareButtons(props) {
    return (
        <div className={`socialShareButtonContainer flex ${props.isVert ? 'flex-col' : 'flex-row'} justify-center w-full px-4 mt-3`}>
            <div className={`facebookShareContainer flex-grow-0 ${props.isVert ? 'my-3' : 'mx-3'}`}>
                <FacebookShareButton url={props.sharePageUrl} quote={props.title} >
                    <img src={fbSvg} width={`${props.isVert ? 50 : 32}`} />
                </FacebookShareButton>
            </div>
            <div className={`twitterShareContainer flex-grow-0 ${props.isVert ? 'my-3' : 'mx-3'}`}>
                <TwitterShareButton url={props.sharePageUrl} title={props.title}>
                    <img src={twitterSvg} width={`${props.isVert ? 50 : 32}`} />
                </TwitterShareButton>
            </div>
            <div className={`tumblrShareContainer flex-grow-0 ${props.isVert ? 'my-3' : 'mx-3'}`}>
                <TumblrShareButton url={props.sharePageUrl} title={props.title}>
                    <img src={tumblrSvg} width={`${props.isVert ? 50 : 32}`} />
                </TumblrShareButton>
            </div>
            <div className={`pinterestShareContainer flex-grow-0 ${props.isVert ? 'my-3' : 'mx-3'}`}>
                <PinterestShareButton url={props.sharePageUrl} media={props.shareImageUrl}>
                    <img src={pinterestSvg} width={`${props.isVert ? 50 : 32}`} />
                </PinterestShareButton>
            </div>
            <div className={`emailShareContainer flex-grow-0 ${props.isVert ? 'my-3' : 'mx-3'}`}>
                <EmailShareButton url={props.sharePageUrl} subject={props.title} body="body">
                    <EmailIcon size={`${props.isVert ? 50 : 32}`} round />
                </EmailShareButton>
            </div>
        </div>
    )
}