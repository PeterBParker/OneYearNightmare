import {JOINT_SIG} from '../Main';
import icon from '../../assets/Website Assets - Phase 1/SVG/FILLER-icon.svg'
export default function JointSignature() {
    return(
        <div className="inline-block flex flex-row">
            <div className="inline float-left">
                <img src={icon} className="icon"/>
            </div>
            <div className="sigText font-header font-medium text-xl text-left inline float-left text-gray-light mx-3 leading-8">
                <p>{JOINT_SIG}</p>
            </div>
        </div>
    );
}