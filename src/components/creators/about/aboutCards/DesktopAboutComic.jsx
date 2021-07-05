import { Link } from 'react-router-dom';
import TextBody from '../../../generic/TextBody';
import CardHeader from '../../../generic/CardHeader';
import DesktopAboutCreators from './DesktopAboutCreators'
import SimpleNavBar from '../../../comics/navigation/desktop/SimpleNavBar';

import aboutComicCardImage from '../../../../assets/Website Assets - Phase 1/SVG_min/ILLO-tree.svg';

export default function DesktopAboutComic(props) {
    let comicText = "This is a note from the creator. Of things yet\
    unsaid. And things to be discovered. Really\
    just things to speak and understand of the\
    bandanna that kicks feelings. It’s hard to be\
    cool when you wear a blue sweater with stars.\
    Braces and dancing and a brain in a jar. This is\
    more text for the mind dead."
    return (
        <div>
            <SimpleNavBar />
            <div className="desktopAboutTheComicContainer grid mx-auto mt-4 mb-12">
                <div className="aboutTheComicText">
                    <CardHeader text="About the Comic" isDesktop={true} />
                </div>
                <div className="textAndImageCard">
                    <div className="textAndImageCardText">
                        <TextBody content={comicText} isDesktop={true} />
                        <div className="readButtonContainer justify-contents-start clearfix mb-12">
                            <div className="readButton font-body font-medium text-xl bg-cream-light rounded-xl px-4 py-2 float-left ml-8">
                                <Link to='/read'>START READING →</Link>
                            </div>
                        </div>
                    </div>
                    <div className="textAndImageCardImage w-full self-center">
                        <img className="mx-auto" src={aboutComicCardImage} width={"100%"} />
                    </div>
                </div>
            </div>
            <DesktopAboutCreators />
        </div>

    )
}