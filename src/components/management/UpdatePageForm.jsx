import React from "react"
import { useEffect, useState } from "react";
import ImageInput from "./InputFile";
import { updatePageObj, justSinglePageData } from "../../api/ComicPageAPI";
import { iconifyFileIntoBlob } from "./utils/iconHelpers";
import SubmitButton from "./utils/SubmitButton";

/**
 * 
 * @param {dictionary} props - an object containing an object of the pageData to update and
 *                             an optional function to call after the update was a success 
 * @returns 
 */
export default function UpdatePageForm({ pageData, postUpdateHook }) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [iconBlob, setIconBlob] = useState(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const SUBMIT_BTN_ID = "updatePageButton";
    const ICON_DISPLAY_ID = "iconDisplay";
    const pageID = pageData["uuid"]
    
    useEffect(() => {
        if (title === "" && message === "" && file === null && iconBlob === null) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
    }, [title, message, file, iconBlob])

    function uploadCallback(file) {
        setIsDisabled(true);
        setFile(file)
        iconifyFileIntoBlob(file, setIconBlob, ICON_DISPLAY_ID)
        setIsDisabled(false);
    }

    async function updatePage(e) {
        e.preventDefault();
        setIsDisabled(true);
        setIsLoading(true);
        try {
            await updatePageObj(pageID, title, message, file, iconBlob);
            setResult("Success!")
            document.getElementById("updatePageDataForm").reset()
            postUpdateHook();
        } catch (error) {
            setResult("Error :(")
            console.log(error)
        }
        setIsLoading(false);
    }

    return (
        <form id="updatePageDataForm" onSubmit={updatePage}>
            <div className="flex flex-row flex-wrap">
                <div className="flex flex-col mb-2" style={{"minWidth": "20rem"}}>
                    <label htmlFor="pageTitle">Page Title</label>
                    <input type="text" name="pageTitle" className="rounded-lg text-lg py-3 px-3 my-2 w-full" placeholder={pageData["title"]} onChange={(e) => setTitle(e.target.value)}></input>
                    <label htmlFor="pageMessage">Page Message</label>
                    <textarea name="pageMessage" rows="4" placeholder={pageData["message"]} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <div className="ml-4 flex flex-col">
                    <ImageInput className="mb-2" fileUploadCallback={uploadCallback}/>
                    <img alt="page icon" id={ICON_DISPLAY_ID} src={pageData["icon_url"]}></img>
                </div>
            </div>
            <SubmitButton label="Update" buttonID={SUBMIT_BTN_ID} isDisabled={isDisabled} isLoading={isLoading}/>
            <div>{result}</div>
        </form>
    )
}