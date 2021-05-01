import InstagramTag from './generic/InstagramTag';
import BuyMeACoffeeTag from './generic/BuyMeACoffeeTag';

export default function Footer() {
    return (
        <div className="footerWrapper">
            <div className="socialMediaLinks">
                <InstagramTag />
                <BuyMeACoffeeTag />
            </div>
            <div className="copyrightWrapper">
                Content and Site © Nathan and Morghan Harris
            </div>

        </div>
    )
}