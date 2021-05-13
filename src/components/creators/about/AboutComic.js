import { Link } from 'react-router-dom';
import TextCard from '../../generic/TextCard';
import AboutCreators from './AboutCreators'

export default function AboutComic(props) {
    let comicText = "This is a note from the creator. Of things yet\
    unsaid. And things to be discovered. Really\
    just things to speak and understand of the\
    bandanna that kicks feelings. It’s hard to be\
    cool when you wear a blue sweater with stars.\
    Braces and dancing and a brain in a jar. This is\
    more text for the mind dead."
    return (
        <div>
            <div className="aboutTheComicContainer grid">
                <div className="aboutTheComicText">
                    <TextCard header="About the Comic" content={comicText} />
                </div>
                <div className="readButtonContainer justify-contents-start mb-12">
                    <div className="readButton font-body font-medium text-xl bg-cream-light rounded-xl px-2 py-2 ml-8 mr-28">
                        <Link to='/read'>START READING →</Link>
                    </div>
                </div>
            </div>
            <AboutCreators />
        </div>

    )
}