import { useState } from "react";
import ImageInput from "./InputFile";
import { appendPageToChapter } from "../../api/ComicPageAPI";

export default function AddFileForm() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState("");
    const [disabled, setIsDisabled] = useState(false);
    const submitBtnId = "addPageSubmitBtn";

    let providedPageData = {
        "author": "HKxEXffkUIXb21Jk4lUIEKKyLYg1",
        "chapter_id": "5aa23909-b7aa-4177-bdba-25cb3a892ef0",
        "message": message,
        "season_id": "44bd96b7-acec-4f01-9425-9bb3d59e29e4",
        "title": title
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let submitBtn = document.getElementById(submitBtnId)
        submitBtn.disabled = true;
        submitBtn.classList.add("disabled");
        setIsDisabled(true);
        await appendPageToChapter(providedPageData, file)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="pageTitleInput" placeholder="Page Title" onChange={(e) => setTitle(e.target.value)} className="rounded-lg text-lg py-3 px-3 my-2 w-full"/>
                <input type="text" id="pageMessageInput" placeholder="Witty caption here" onChange={(e) => setMessage(e.target.value)} className="rounded-lg text-lg my-2 py-3 px-3 w-full"/>
                <div className="my-2">
                    <ImageInput file={file} setFile={setFile} />
                </div>
                <button type="submit" id={submitBtnId} className="btn-std-hover btn my-2 py-2 w-full text-lg bg-cream-dark font-medium not-italic rounded">Submit</button>
            </form>
        </div>
    )
}