import {
    FacebookShareButton,
    TwitterShareButton,
    TumblrShareButton,
    PinterestShareButton,
    EmailShareButton,
} from "react-share";

import fb50 from '../../assets/Phase4-Assets1/2x/NEW_ICONS/fill-FB-50px.png';
import fb50color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-FB-50px.png'
import twitter50 from '../../assets/Phase4-Assets1/2x/NEW_ICONS/fill-twitter-50px.png';
import twitter50color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-twitter-50px.png'
import tumblr50 from '../../assets/Phase4-Assets1/2x/NEW_ICONS/fill-tumblr-50px.png';
import tumblr50color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-tumblr-50px.png'
import pinterest50 from '../../assets/Phase4-Assets1/2x/NEW_ICONS/fill-pinterest-50px.png';
import pinterest50color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-pinterest-50px.png'
import email50 from '../../assets/Phase4-Assets1/2x/NEW_ICONS/fill-email-50px.png';
import email50color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-email-50px.png'

import fb32 from '../../assets/Phase3-Assets1/1x/32x-FB.png';
import fb32color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-FB-32.png'
import twitter32 from '../../assets/Phase3-Assets1/1x/32x-Twitter.png';
import twitter32color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-twitter-32px.png'
import tumblr32 from '../../assets/Phase3-Assets1/1x/32x-Tumbler.png';
import tumblr32color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-tumblr-32px.png'
import pinterest32 from '../../assets/Phase3-Assets1/1x/32x-Pinterest.png';
import pinterest32color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-pinterest-32px.png'
import email32 from '../../assets/Phase3-Assets1/1x/32x-email.png';
import email32color from '../../assets/Phase4-Assets1/2x/NEW_ICONS/color-fill-email-32px.png'
import { useState } from "react";

export default function SocialMediaShareButtons(props) {
    const COLOR_ICONS_50 = {'fb': fb50color, 'twitter': twitter50color, 'tumblr': tumblr50color, 'pinterest': pinterest50color, 'email': email50color};
    const COLOR_ICONS_32 = {'fb': fb32color, 'twitter': twitter32color, 'tumblr': tumblr32color, 'pinterest': pinterest32color, 'email': email32color};
    const ICONS_50 = {'fb': fb50, 'twitter': twitter50, 'tumblr': tumblr50, 'pinterest': pinterest50, 'email': email50};
    const ICONS_32 = {'fb': fb32, 'twitter': twitter32, 'tumblr': tumblr32, 'pinterest': pinterest32, 'email': email32};

    let [fbIcon, setFbIcon] = useState(getIcon('fb', false)) 
    let [twitterIcon, setTwitterIcon] = useState(getIcon('twitter', false))
    let [tumblrIcon, setTumblrIcon] = useState(getIcon('tumblr', false))
    let [pinterestIcon, setPinterestIcon] = useState(getIcon('pinterest', false))
    let [emailIcon, setEmailIcon] = useState(getIcon('email', false))

    

    function getIcon(platform, isColored) {
        let icon = null
        if(props.isVert) {
            if(isColored) {
                icon = COLOR_ICONS_50[platform]
            } else {
                icon = ICONS_50[platform]
            }
        } else {
            if(isColored) {
                icon = COLOR_ICONS_32[platform]
            } else {
                icon = ICONS_32[platform]
            }
        }
        return icon
    }



    return (
        <div className={`socialShareButtonContainer flex ${props.isVert ? 'flex-col' : 'flex-row'} justify-center w-full px-4 mt-3`}>
            <div className={`facebookShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <FacebookShareButton url={props.sharePageUrl} quote={props.title} >
                    <img src={fbIcon} width={`${props.isVert ? 50 : 32}`} onMouseOver={() => setFbIcon(getIcon('fb', true))} onMouseOut={() => setFbIcon(getIcon('fb', false))}/>
                </FacebookShareButton>
            </div>
            <div className={`twitterShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <TwitterShareButton url={props.sharePageUrl} title={props.title}>
                    <img src={twitterIcon} width={`${props.isVert ? 50 : 32}`} onMouseOver={() => setTwitterIcon(getIcon('twitter', true))} onMouseOut={() => setTwitterIcon(getIcon('twitter', false))} />
                </TwitterShareButton>
            </div>
            <div className={`tumblrShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <TumblrShareButton url={props.sharePageUrl} title={props.title}>
                    <img src={tumblrIcon} width={`${props.isVert ? 50 : 32}`} onMouseOver={() => setTumblrIcon(getIcon('tumblr', true))} onMouseOut={() => setTumblrIcon(getIcon('tumblr', false))}/>
                </TumblrShareButton>
            </div>
            <div className={`pinterestShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <PinterestShareButton url={props.sharePageUrl} media={props.shareImageUrl}>
                    <img src={pinterestIcon} width={`${props.isVert ? 50 : 32}`} onMouseOver={() => setPinterestIcon(getIcon('pinterest', true))} onMouseOut={() => setPinterestIcon(getIcon('pinterest', false))} />
                </PinterestShareButton>
            </div>
            <div className={`emailShareContainer flex-grow-0 ${props.isVert ? 'my-2' : 'mx-3'}`}>
                <EmailShareButton url={props.sharePageUrl} subject={props.title} body="body">
                    <img src={emailIcon} width={`${props.isVert ? 50 : 32}`} onMouseOver={() => setEmailIcon(getIcon('email', true)) } onMouseOut={() => setEmailIcon(getIcon('email', false))}/>
                </EmailShareButton>
            </div>
        </div>
    )
}