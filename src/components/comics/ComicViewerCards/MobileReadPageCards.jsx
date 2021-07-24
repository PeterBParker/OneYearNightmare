import PageDetailsCard from '../PageDetailsCard';
import SupportUsCard from '../../generic/SupportUs/SupportUsCard';

export default function MobileReadPageCards(props) {
    return ([
        <PageDetailsCard pageId={props.pageId} key="mobileReadPageDetailsCard"/>,
        <SupportUsCard key="mobileReadPageSupportUsCard"/>
    ])
}