import { useEffect, useState } from "react";
import ImageInput from "./InputFile";
import { appendPageToChapter } from "../../api/ComicPageAPI";

export default function AddFileForm() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState("");
    const [disabled, setIsDisabled] = useState(false);
    const [result, setResult] = useState("");
    const [iconBlob, setIconBlob] = useState(null);
    const submitBtnId = "addPageSubmitBtn";

    //useEffect(() => {
    //     //TODO disable btn unless all fields are filled
    // })

    // when I select an image on the form, I want the submit button to be disabled until the icon loads as a preview.
    // then when the submit button is clicked, the image object on the canvas is passed to the appendPageToChapter and
    // it uses the already loaded icon as the upload data. 
    // in order to do this, I need to add an event that disables the submit button and renders the icon.
    function fileUploadCallback(file) {
        setIsDisabled(true);
        setFile(file);
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 300.75;
        const ctx = canvas.getContext("2d");
        var img = new Image();
        img.addEventListener("load", () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataURI = canvas.toDataURL("image/webp");
            
            let testDisplay = document.getElementById("iconDisplay")
            testDisplay.src = dataURI
        
            canvas.toBlob((dataBlob) => {setIconBlob(dataBlob)})
        })
        img.src = URL.createObjectURL(file) 
        setIsDisabled(false);
    }

    // TODO grab the author id from the logged in user
    // TODO grab the chapter and season id from a selection
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
        try {
            let [success, err] = await appendPageToChapter(providedPageData, file, iconBlob)
            if (success) {
                setResult("Success!")
                setTitle("")
                setMessage("")
                setFile("")
                setIconBlob(null)
                document.getElementById("pageAddForm").reset()
                document.getElementById("iconDisplay").src = ""
            } else {
                setResult("Failed. :(" + err)
            }
        } catch(err) {
            console.log(err)
        } finally {
            setIsDisabled(false);
        }

    }

    return(
        <div>
            <form id="pageAddForm" onSubmit={handleSubmit}>
                <input type="text" id="pageTitleInput" placeholder="Page Title" onChange={(e) => setTitle(e.target.value)} className="rounded-lg text-lg py-3 px-3 my-2 w-full"/>
                <input type="text" id="pageMessageInput" placeholder="Witty caption here" onChange={(e) => setMessage(e.target.value)} className="rounded-lg text-lg my-2 py-3 px-3 w-full"/>
                <div className="my-2">
                    <ImageInput setFile={fileUploadCallback} />
                </div>
                <button type="submit" id={submitBtnId} disabled={disabled} className="btn-std-hover btn my-2 py-2 w-full text-lg bg-cream-dark font-medium not-italic rounded">Submit</button>
                <div>{result}</div>
                <img alt="" id="iconDisplay"></img>
            </form>
        </div>
    )
}