import PageDetailsCard from '../PageDetailsCard';
import SupportUsCard from '../../generic/SupportUs/SupportUsCard';

export default function MobileReadPageCards(props) {
    return ([
        <PageDetailsCard page={props.page} chapter={props.chapter} key="mobileReadPageDetailsCard"/>,
        <SupportUsCard/>
    ])
}