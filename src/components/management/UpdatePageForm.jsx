import React from "react"
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import querySizes from "../../styling/breakpoints.json"
import ImageInput from "./InputFile";
import { updatePageObj } from "../../api/ComicPageAPI";
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
    const [result, setResult] = useState("Update");
    const [isLoading, setIsLoading] = useState(false);
    const isDesktop = useMediaQuery({ query: querySizes["lg"] });
    const SUBMIT_BTN_ID = "updatePageButton";
    const ICON_DISPLAY_ID = "iconDisplay";
    const pageID = pageData["uuid"]
    
    useEffect(() => {
        if (title === "" && message === "" && file === null && iconBlob === null) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
            setResult("Update")
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
            <div className="flex flex-row flex-wrap mt-4 justify-between">
                <div className={`flex flex-col ${isDesktop ? null : "w-full"}`} style={{"minWidth": "20rem"}}>
                    <label className="text-left" htmlFor="pageTitle">Title</label>
                    <input type="text" name="pageTitle" className="rounded-lg text-lg py-3 px-3 mb-2 w-full" placeholder={pageData["title"]} onChange={(e) => setTitle(e.target.value)}></input>
                    <label className="text-left" htmlFor="pageMessage">Message</label>
                    <textarea name="pageMessage" className="h-full py-2 px-3" placeholder={pageData["message"]} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div className="mt-2">
                        {isDesktop ? <SubmitButton label={result} buttonID={SUBMIT_BTN_ID} isDisabled={isDisabled} isLoading={isLoading}/> : null}
                    </div>
                </div>
                <div className={`ml-4 flex flex-col ${isDesktop ? null : "ml-auto mr-auto"}`} style={{"width": "200px"}}>
                    <ImageInput className="mb-2" fileUploadCallback={uploadCallback}/>
                    <img className="border-2 border-grey" alt="page icon" id={ICON_DISPLAY_ID} src={pageData["icon_url"]}></img>
                </div>
            </div>
            <div className="my-4">
                    {isDesktop ? null : <SubmitButton label={result} buttonID={SUBMIT_BTN_ID} isDisabled={isDisabled} isLoading={isLoading}/> }
                </div>
        </form>
    )
}