export default function CardHeader(props) {
    return(
        <div>
            <hr className="border-mocha-light"/>
            <div className="bg-eggshell px-6 py-3 font-header text-3xl font-bold text-left text-grey-light">
                <p>{props.text}</p>
            </div>
        </div>   
    )
}