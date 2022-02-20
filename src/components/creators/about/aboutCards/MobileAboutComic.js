import { Link } from 'react-router-dom';
import Header from '../../../header/Header';
import TextCard from '../../../generic/TextCard';
import MobileAboutCreators from './MobileAboutCreators'

export default function MobileAboutComic(props) {
    
    return (
        <div>
            <Header defaultBg={true}/>
            <div className="aboutTheComicContainer bg-white grid">
                <div className="aboutTheComicText">
                    <TextCard header="About the Comic" content={props.comicText} isDesktop={false}/>
                </div>
                <div className="readButtonContainer justify-contents-start clearfix mb-12">
                    <div className="readButton font-body font-medium text-xl bg-cream-light rounded-xl px-4 py-2 float-left ml-8">
                        <Link to='/read'>START READING →</Link>
                    </div>
                </div>
            </div>
            <MobileAboutCreators {...props}/>
        </div>

    )
}