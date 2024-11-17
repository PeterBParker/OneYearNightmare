import { useEffect, useState } from "react";
import ImageInput from "./InputFile";
import { justSinglePageData, updatePageObj } from "../../api/ComicPageAPI";
import { iconifyFileIntoBlob } from "./utils/iconHelpers";

export default function UpdatePageForm() {
    const [pageID, setPageID] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [iconBlob, setIconBlob] = useState(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);
    const [result, setResult] = useState(null);
    const ICON_DISPLAY_ID = "iconDisplay";
    const SUBMIT_BTN_ID = "updatePageButton";

    async function lookupPage(e) {
        e.preventDefault();
        let pageData = await justSinglePageData(pageID)
        setPageData(pageData);
    }

    function uploadCallback(file) {
        setIsDisabled(true);
        setFile(file)
        iconifyFileIntoBlob(file, setIconBlob, ICON_DISPLAY_ID)
        setIsDisabled(false);
    }

    useEffect(() => {
        if (title === null && message === null && file === null && iconBlob === null) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
    }, [title, message, file, iconBlob])

    async function updatePage(e) {
        e.preventDefault();
        try {
            await updatePageObj(pageID, title, message, file, iconBlob);
            setResult("Success!")
            let pageData = await justSinglePageData(pageID)
            document.getElementById("updatePageData").reset()
            setPageData(pageData);
        } catch (error) {
            setResult("Error :(")
            console.log(error)
        }
    }

    // On Page Lookup, it will display the title, message, and page icon
    // The title will the placeholder be in an editable input field, the message will be in an editable textarea
    // There will be a upload image button that will update the page icon display
    return (
        <div>
            <div className="text-left text-lg font-header">Update Page</div>
            <form id="updatePageLookup" onSubmit={lookupPage}>
                <input type="text" className="rounded-lg text-lg py-3 px-3 my-2 w-full" placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" onChange={(e) => setPageID(e.target.value)}></input>
                <button type="submit" className="btn-std-hover btn my-2 py-2 w-full text-lg bg-cream-confirm font-medium not-italic rounded">Look Up Page</button>
            </form>
            { pageData !== null ? 
                <form id="updatePageData" onSubmit={updatePage}>
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
                    <button type="submit" id={SUBMIT_BTN_ID} disabled={isDisabled} className="btn-std-hover btn my-2 py-2 w-full text-lg bg-green-confirm font-medium not-italic rounded">Update</button>
                    <div>{result}</div>
                </form>
            :
                null
            }
        </div>
    )
}