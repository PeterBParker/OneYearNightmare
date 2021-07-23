import {
    FacebookShareButton,
    TwitterShareButton,
    TumblrShareButton,
    PinterestShareButton,
    EmailShareButton,
} from "react-share";

import fb50 from '../../assets/Phase3-Assets1/1x/50x-FB.png';
import twitter50 from '../../assets/Phase3-Assets1/1x/50x-Twitter.png';
import tumblr50 from '../../assets/Phase3-Assets1/1x/50x-Tumbler.png';
import pinterest50 from '../../assets/Phase3-Assets1/1x/50x-Pinterest.png';
import email50 from '../../assets/Phase3-Assets1/1x/50x-Email.png';

import fb32 from '../../assets/Phase3-Assets1/1x/32x-FB.png';
import twitter32 from '../../assets/Phase3-Assets1/1x/32x-Twitter.png';
import tumblr32 from '../../assets/Phase3-Assets1/1x/32x-Tumbler.png';
import pinterest32 from '../../assets/Phase3-Assets1/1x/32x-Pinterest.png';
import email32 from '../../assets/Phase3-Assets1/1x/32x-email.png';

export default function SocialMediaShareButtons(props) {
    return (
        <div className={`socialShareButtonContainer flex ${props.isVert ? 'flex-col' : 'flex-row'} justify-center w-full px-4 mt-3`}>
            <div className={`facebookShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <FacebookShareButton url={props.sharePageUrl} quote={props.title} >
                    <img src={props.isVert? fb50 : fb32 } width={`${props.isVert ? 50 : 32}`} />
                </FacebookShareButton>
            </div>
            <div className={`twitterShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <TwitterShareButton url={props.sharePageUrl} title={props.title}>
                    <img src={props.isVert? twitter50 : twitter32 } width={`${props.isVert ? 50 : 32}`} />
                </TwitterShareButton>
            </div>
            <div className={`tumblrShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <TumblrShareButton url={props.sharePageUrl} title={props.title}>
                    <img src={props.isVert? tumblr50 : tumblr32 } width={`${props.isVert ? 50 : 32}`} />
                </TumblrShareButton>
            </div>
            <div className={`pinterestShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <PinterestShareButton url={props.sharePageUrl} media={props.shareImageUrl}>
                    <img src={props.isVert? pinterest50 : pinterest32 } width={`${props.isVert ? 50 : 32}`} />
                </PinterestShareButton>
            </div>
            <div className={`emailShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <EmailShareButton url={props.sharePageUrl} subject={props.title} body="body">
                    <img src={props.isVert? email50 : email32 } width={`${props.isVert ? 50 : 32}`} />
                </EmailShareButton>
            </div>
        </div>
    )
}