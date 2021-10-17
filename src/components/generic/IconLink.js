
export default function IconLink(props) {
    return(
        <div className="iconLink">
            <a href={props.link} className=""><img src={props.icon} width={32} /></a>
        </div>
    )
}