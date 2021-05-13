import CardHeader from './CardHeader';

export default function TextCard(props) {
    return(
        <div className="textCard">
            <CardHeader text={props.header} />
            <div className="bodyText font-body text-grey-light my-6 mx-8 text-left font-normal">{props.content}</div>
        </div>
    )
}