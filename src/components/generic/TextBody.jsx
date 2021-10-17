export default function TextBody(props) {
    return(
            <div className={`${props.isDesktop?'text-lg':''} bodyText font-body text-grey-light my-6 mx-8 text-left font-normal`}>{props.content}</div>
    )
}