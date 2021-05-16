import { PreviousMap } from "postcss"

export default function Support(props) {
    return(
        <div className="iconCardContainer width-full">
            <div className="iconCardHeader">
                <img src={props.icon} width={120} className="mx-auto py-4"/>
            </div>
            <div className="iconCardTitle font-header text-grey-light font-bold text-3xl mb-4">
                <p>{props.title}</p>
            </div>
            <div className="iconCardBody font-body text-grey-light text-left mx-6">
                <p>{props.body}</p>
            </div>
            <div className="iconCardButton clearfix px-6 pt-5 pb-10">
                <div>
                    <a className="bg-cream-light py-2 px-4 float-left font-medium font-xl font-header rounded-lg" href={props.link}>{props.linkText.toUpperCase()} →</a>
                </div>
            </div>
        </div>
    )
}