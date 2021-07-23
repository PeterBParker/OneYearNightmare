import ComicPageAPI from '../../api/ComicPageAPI';
import {
    Link
} from 'react-router-dom';
import Title from '../generic/Title';
import BodyText from '../generic/BodyText';
import JointSignature from '../generic/JointSignature';
import { stringify } from 'postcss';


export default function DesktopPageDetailsCard(props) {
    let page = ComicPageAPI.getPageObj(props.pageId)
    let date = new Date(page.datetime)
    let volNum = String(ComicPageAPI.getSeasonNum(props.pageId)).padStart(2, '0');
    let pageNum = String(page.pageNum).padStart(2, '0');
    let title = "Vol " + volNum + " // Pg " + pageNum;

    return (
        <div className="desktopPageDetailsContainer">
            {/* TODO: Remove display: grid from this parent container */}
            <div className="desktopPageDetailsTitle">
                <div className="text-left p-8">
                    <Title text={title} />
                </div>
            </div>
            <div className="desktopPageDetailsMessage px-8 py-4">
                <div className="text-left text-lg">
                    <BodyText text={page.message} />
                </div>
            </div>

            <div className="desktopPageDetailsSigAndTime px-8 py-4 border-t-2 border-mocha-dark">
                <div className="desktopPageDetailsSignature">
                    <JointSignature />
                </div>
                <div className="desktopPageDetailsTime self-center">
                    <div className="date float-right leading-8 self-center">
                        <div className="font-body font-regular text-xl text-gray-light leading-8">
                            {String(date.getMonth()) + "." + String(date.getDate()) + "." + String(date.getFullYear())}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}