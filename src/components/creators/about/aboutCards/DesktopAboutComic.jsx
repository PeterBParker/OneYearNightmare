import { Link } from 'react-router-dom';
import Header from '../../../header/Header';
import TextBody from '../../../generic/TextBody';
import CardHeader from '../../../generic/CardHeader';
import DesktopAboutCreators from './DesktopAboutCreators'
import SimpleNavBar from '../../../comics/navigation/desktop/SimpleNavBar';
import Pages from '../../../comics/navigation/desktop/Pages';
import aboutComicCardImage from '../../../../assets/Phase3-Assets1/1x/SkullBird-white-edge-CROPPED.png';

export default function DesktopAboutComic(props) {
    return (
        <div className="">
            <Header defaultBg={true}/>
            <SimpleNavBar page={Pages.ABOUT}/>
            <div className="desktopAboutTheComicContainer bg-white grid mx-auto mt-4 mb-12">
                <div className="aboutTheComicText">
                    <CardHeader text="About the Comic" isDesktop={true} />
                </div>
                <div className="textAndImageCard bg-white">
                    <div className="textAndImageCardText">
                        <TextBody content={props.comicText} isDesktop={true} />
                        <div className="readButtonContainer justify-contents-start clearfix mb-12">
                            <div className="readButton transition duration-500 ease-in-out bg-cream-dark hover:bg-eggshell font-body font-medium text-xl bg-cream-light rounded-xl px-4 py-2 float-left ml-8">
                                <Link to='/read'>START READING →</Link>
                            </div>
                        </div>
                    </div>
                    <div className="textAndImageCardImage w-full self-center birdMonsterImage">
                        <img className="mx-auto" src={aboutComicCardImage} width={"100%"} />
                    </div>
                </div>
            </div>
            <DesktopAboutCreators {...props}/>
        </div>

    )
}