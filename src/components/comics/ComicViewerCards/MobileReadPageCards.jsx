import PageDetailsCard from '../PageDetailsCard';
import CommentCard from '../../generic/CommentCard';

export default function MobileReadPageCards(props) {
    return ([
        <PageDetailsCard pageId={props.pageId} key="mobileReadPageDetailsCard"/>,
        <CommentCard />
    ])
}