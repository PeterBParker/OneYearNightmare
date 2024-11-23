import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { httpsCallable } from "@firebase/functions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";

import { auth, functions } from "../..";
import { toDateInputValue } from "./utils/formHelpers";
import ImageInput from "./InputFile";
import querySizes from "../../styling/breakpoints.json"
import { addIconURL, addPublicURL, appendPageToChapter } from "../../api/ComicPageAPI";
import { PageLoadingSpinner } from "../generic/loading/Spinners";
import { allPagesQuery } from "../../routes/Archive";
import { iconifyFileIntoBlob, ICON_WIDTH } from "./utils/iconHelpers";
import SubmitButton from "./utils/SubmitButton";
import placeholderIcon from "./assets/placeholderIcon.svg"

export default function AddFileForm() {
    const {data, isLoading} = useQuery(allPagesQuery());
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState("");
    const [pubDatetime, setPubDatetime] = useState(toDateInputValue(new Date()));
    const [disabled, setIsDisabled] = useState(false);
    const [result, setResult] = useState("Save");
    const [iconBlob, setIconBlob] = useState(null);
    const [user, loading] = useAuthState(auth);
    const [isSaving, setIsSaving] = useState(false);
    const isDesktop = useMediaQuery({ query: querySizes["lg"] });
    const schedulePagePublish = httpsCallable(functions, "publishPageAt")
    const submitBtnId = "addPageSubmitBtn";
    const ICON_DISPLAY_ID = "iconDisplay";

    useEffect(() => {
        if (title !== "" && message !== "" && file !== null && iconBlob !== null) {
            setResult("Save")
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [title, message, file, iconBlob])

    if (loading || isLoading) {
        return <PageLoadingSpinner />
    }

    async function handlePageScheduling() {
        // Can't serialize the File object, so we'll store it + icon and then pass the paths
        const fileName = file.name
        await Promise.all([
            addPublicURL(providedPageData, file),
            addIconURL(providedPageData, iconBlob)
        ])
        schedulePagePublish({"pageData": providedPageData, "fileName": fileName, "publishAt": pubDatetime})
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
            let success = true
            await handlePageScheduling();
            let err = ""
            // let [success, err] = await appendPageToChapter(providedPageData, file, iconBlob)
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
            <form id="pageAddForm" onSubmit={handleSubmit}>
                <div className="flex flex-row flex-wrap justify-between">
                    <div className={`flex flex-col ${isDesktop ? null : "w-full"}`} style={{"minWidth": "22rem"}}>
                        <input required name="titleInput" type="text" id="pageTitleInput" placeholder="Page Title" onChange={(e) => setTitle(e.target.value)} className="rounded-lg text-lg py-3 px-3 my-2 w-full"/>
                        <textarea required id="pageMessageInput" placeholder="Witty caption here" onChange={(e) => setMessage(e.target.value)} className="rounded-lg text-lg my-2 py-3 px-3 w-full h-full"/>
                        <input type="datetime-local" value={pubDatetime} className="py-3 px-3 rounded-lg my-2" onChange={(e) => {setPubDatetime(e.target.value)}}/>
                        {isDesktop ? <div className="py-2"><SubmitButton label={result === null ? "Save" : result} buttonID={submitBtnId} isDisabled={disabled} isLoading={isSaving}/></div> : null }
                    </div>
                    <div className={`my-2 ml-4 ${isDesktop ? null : "ml-auto mr-auto"}`} style={{"width": ICON_WIDTH}}>
                        <ImageInput required fileUploadCallback={uploadCallback}/>
                        <img className="rounded-sm border-2 border-grey" alt="" id={ICON_DISPLAY_ID} src={placeholderIcon}></img>
                    </div>
                </div>
                {isDesktop ? null : <div className="my-4"><SubmitButton label={result === null ? "Save" : result} buttonID={submitBtnId} isDisabled={disabled} isLoading={isSaving}/></div>}
            </form>
        </div>
    )
}