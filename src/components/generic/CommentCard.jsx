import Title from './Title';
import { useMediaQuery } from 'react-responsive';
import querySizes from '../../styling/breakpoints.json';

export default function CommentCard(props) {
    const isDesktop = useMediaQuery({query: querySizes['lg']});
    return (
        <div className={`${isDesktop ? "desktopSupportUsContainer" : "mobileSupportUsContainer"} supportUsContainer mb-6`}>
            <div className="supportUsTitle py-4 px-8 bg-eggshell text-left flex flex-row items-center">
                <Title text="Comments //" />
            </div>
            <div>
                <script defer src="https://cdn.commento.io/js/commento.js"></script>
                <div id="commento"></div>
            </div>
        </div>
    )
}