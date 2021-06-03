import {JOINT_SIG} from '../Main';
import icon from '../../assets/Website Assets - Phase 1/SVG/FILLER-icon.svg'
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';

export default function JointSignature() {
    const isDesktop = useMediaQuery({query: querySizes['lg']})
    return(
        <div className="inline-block flex flex-row">
            <div className="inline float-left self-center">
                <img src={icon} width={`${isDesktop ? "50px" : "33px"}`}/>
            </div>
            <div className={`sigText font-header font-medium ${isDesktop ? "text-2xl" : "text-xl"} text-left inline float-left text-gray-light mx-3 leading-8 self-center`}>
                <p>{JOINT_SIG}</p>
            </div>
        </div>
    );
}