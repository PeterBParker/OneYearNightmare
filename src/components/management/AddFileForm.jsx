import { useState } from "react";

import { auth } from "../..";
import ImageInput from "./InputFile";
import { appendPageToChapter } from "../../api/ComicPageAPI";
import { useAuthState } from "react-firebase-hooks/auth";
import { PageLoadingSpinner } from "../generic/loading/Spinners";
import { useQuery } from "@tanstack/react-query";
import { allPagesQuery } from "../../routes/Archive";
import { iconifyFileIntoBlob } from "./utils/iconHelpers";
import SubmitButton from "./utils/SubmitButton";

export default function AddFileForm() {
    const {data, isLoading} = useQuery(allPagesQuery());
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState("");
    const [disabled, setIsDisabled] = useState(false);
    const [result, setResult] = useState("");
    const [iconBlob, setIconBlob] = useState(null);
    const [user, loading] = useAuthState(auth);
    const [isSaving, setIsSaving] = useState(false);
    const submitBtnId = "addPageSubmitBtn";
    const ICON_DISPLAY_ID = "iconDisplay";

    if (loading || isLoading) {
        return <PageLoadingSpinner />
    }

    let latestChapter = data["chapters"].slice(-1).pop()
    // TODO grab season id from a selection when there are multiple seasons
    let providedPageData = {
        "author": user.uid,
        "chapter_id": latestChapter["uuid"],
        "message": message,
        "season_id": "44bd96b7-acec-4f01-9425-9bb3d59e29e4",
        "title": title
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        setIsSaving(true);
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
            setIsSaving(false);
        }
    }

    function uploadCallback(file) {
        setIsDisabled(true);
        setFile(file);
        iconifyFileIntoBlob(file, setIconBlob, ICON_DISPLAY_ID)
        setIsDisabled(false)
    }

    return(
        <div>
            <div className="text-left text-lg font-header">Add Page</div>
            <form id="pageAddForm" onSubmit={handleSubmit}>
                <div className="flex flex-row flex-wrap">
                    <div className="flex flex-col" style={{"minWidth": "20rem"}}>
                        <input type="text" id="pageTitleInput" placeholder="Page Title" onChange={(e) => setTitle(e.target.value)} className="rounded-lg text-lg py-3 px-3 my-2 w-full"/>
                        <textarea id="pageMessageInput" rows="4" placeholder="Witty caption here" onChange={(e) => setMessage(e.target.value)} className="rounded-lg text-lg my-2 py-3 px-3 w-full"/>

                    </div>
                    <div className="my-2 mx-4">
                        <ImageInput fileUploadCallback={uploadCallback}/>
                        <img alt="" id={ICON_DISPLAY_ID}></img>
                    </div>
                </div>
                
                <SubmitButton label="Save" buttonID={submitBtnId} isDisabled={disabled} isLoading={isSaving}/>
                <div>{result}</div>
            </form>
        </div>
    )
}