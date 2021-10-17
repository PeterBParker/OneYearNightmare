export default function CardHeader(props) {

    return(
        <div>
            {props.isDesktop?'':<hr className="border-mocha-light"/>}
            <div className="bg-eggshell px-8 py-8 font-header text-4xl font-bold text-left text-grey-light">
                <p>{props.text}</p>
            </div>
        </div>   
    )
}