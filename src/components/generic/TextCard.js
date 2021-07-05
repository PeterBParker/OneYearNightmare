import CardHeader from './CardHeader';
import TextBody from './TextBody';

export default function TextCard(props) {
    return(
        <div className="textCard">
            <CardHeader text={props.header} isDesktop={props.isDesktop}/>
            <TextBody content={props.content} isDesktop={props.isDesktop}/>
        </div>
    )
}