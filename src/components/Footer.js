import InstagramTag from './generic/InstagramTag';

export default function Footer() {
    return (
        <div className="footerWrapper">
            <div className="socialMediaLinks">
                <InstagramTag />
            </div>
            <div className="copyrightWrapper">
                Content and Site © Nathan and Morghan Harris
            </div>

        </div>
    )
}