
export default function ChapterBanner(props) {

    return(
        <div className="my-4 mx-6 font-header text-3xl text-center cursor-pointer">
            <div className="py-4 bg-eggshell hover:bg-grey-light hover:text-eggshell">
                {props.chapterName}
            </div>
        </div>
    )
}