import ComicPageAPI from '../../api/ComicPageAPI';
import moIcon from '../../assets/Phase3-Assets1/1x/32x-profile-M.png';
import nathanIcon from '../../assets/Phase3-Assets1/1x/32x-profile-N.png';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';

export default function JointSignature(props) {
    const isDesktop = useMediaQuery({query: querySizes['lg']})
    let userIcon = null;
    if (props.userId == "N1995") {
        userIcon = nathanIcon;
    } else if (props.userId == "M1998") {
        userIcon = moIcon;
    }
    return(
        <div className="inline-block flex flex-row">
            <div className="inline float-left self-center">
                <img src={userIcon} width={`${isDesktop ? "50px" : "33px"}`}/>
            </div>
            <div className={`sigText font-header font-medium ${isDesktop ? "text-2xl" : "text-xl"} text-left inline float-left text-gray-light mx-3 leading-8 self-center`}>
                <p>{ComicPageAPI.getAdminDisplayName(props.userId)}</p>
            </div>
        </div>
    );
}