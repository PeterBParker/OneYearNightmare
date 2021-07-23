import {
    Link
} from 'react-router-dom';
import Title from '../generic/Title';
import BodyText from '../generic/BodyText';
import JointSignature from '../generic/JointSignature';
import { stringify } from 'postcss';


export default function DesktopPageDetailsCard(props) {
    return (
        <div className="desktopPageDetailsContainer">
            <div className="desktopPageDetailsTitle">
                <div className="text-left p-8">
                    <Title text={props.title} />
                </div>
            </div>
            <div className="desktopPageDetailsMessage px-8 py-4">
                <div className="text-left text-lg">
                    <BodyText text={props.page.message} />
                </div>
            </div>

            <div className="desktopPageDetailsSigAndTime px-8 py-4 border-t-2 border-mocha-dark">
                <div className="desktopPageDetailsSignature">
                    <JointSignature userId={props.page.user}/>
                </div>
                <div className="desktopPageDetailsTime self-center">
                    <div className="date float-right leading-8 self-center">
                        <div className="font-body font-regular text-xl text-gray-light leading-8">
                            {String(props.date.getMonth()) + "." + String(props.date.getDate()) + "." + String(props.date.getFullYear())}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}