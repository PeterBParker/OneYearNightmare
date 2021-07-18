import SocialMediaShareButtons from './SocialMediaShareButtons';

export default function HorizontalShare(props) {
    return (
        <div className="socialShareContainer my-3">
                <div className="text-center text-mocha-light font-body font-semibold">
                    <div>share this comic:</div>
                </div>
                <SocialMediaShareButtons sharePageUrl={props.sharePageUrl} shareImageUrl={props.shareImageUrl} title={props.title} isVert={false}/>
        </div>
    )
}