import ComicPageAPI from '../../api/ComicPageAPI';
import {  
    Link
} from 'react-router-dom';
import Title from '../generic/Title';
import BodyText from '../generic/BodyText';
import JointSignature from '../generic/JointSignature';
import { stringify } from 'postcss';

export default function PageDetailsCard(props) {
    let page = ComicPageAPI.getPageObj(props.pageId)
    let date = new Date(page.datetime)
    let volNum = String(ComicPageAPI.getSeasonNum(props.pageId)).padStart(2, '0');
    let pageNum = String(page.pageNum).padStart(2, '0');
    let title = "Vol " + volNum + " // Pg " + pageNum;

    return (
        <div className="container w-full border-t border-b border-mocha-dark py-6 px-6">
            <div className="title w-full inline-block">
                <div className="text-left">
                    <Title text={title} />
                </div>
            </div>
            <div className="message text-base w-full inline-block my-5">
                <div className="text-left">
                    <BodyText text={page.message}/>
                </div>
            </div>
            <div className="signatureAndTime inline-block w-full">
                <div className="sig float-left">
                    <JointSignature/>
                </div>
                <div className="date float-right leading-8">
                    <BodyText text={String(date.getMonth())+"."+String(date.getDate())+"."+String(date.getFullYear())} />
                </div>
            </div>
        </div>
    )
}