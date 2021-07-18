import { Link } from 'react-router-dom';
import Header from '../../../header/Header';
import TextCard from '../../../generic/TextCard';
import MobileAboutCreators from './MobileAboutCreators'

export default function MobileAboutComic(props) {
    let comicText = "This is a note from the creator. Of things yet\
    unsaid. And things to be discovered. Really\
    just things to speak and understand of the\
    bandanna that kicks feelings. It’s hard to be\
    cool when you wear a blue sweater with stars.\
    Braces and dancing and a brain in a jar. This is\
    more text for the mind dead."
    return (
        <div>
            <Header defaultBg={true}/>
            <div className="aboutTheComicContainer grid">
                <div className="aboutTheComicText">
                    <TextCard header="About the Comic" content={comicText} isDesktop={false}/>
                </div>
                <div className="readButtonContainer justify-contents-start clearfix mb-12">
                    <div className="readButton font-body font-medium text-xl bg-cream-light rounded-xl px-4 py-2 float-left ml-8">
                        <Link to='/read'>START READING →</Link>
                    </div>
                </div>
            </div>
            <MobileAboutCreators />
        </div>

    )
}