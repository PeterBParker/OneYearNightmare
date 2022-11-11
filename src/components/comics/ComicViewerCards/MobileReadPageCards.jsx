import PageDetailsCard from '../PageDetailsCard';
import CommentCard from '../../generic/CommentCard';

export default function MobileReadPageCards(props) {
    return ([
        <PageDetailsCard page={props.page} chapter={props.chapter} key="mobileReadPageDetailsCard"/>,
        <CommentCard page={props.page} key="mobileCommentCard"/>
    ])
}