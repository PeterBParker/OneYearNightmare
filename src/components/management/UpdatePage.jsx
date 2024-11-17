import { useState } from "react";
import { justSinglePageData } from "../../api/ComicPageAPI";
import UpdatePageForm from "./UpdatePageForm";

export default function UpdatePage() {
    const [pageID, setPageID] = useState(null);
    const [pageData, setPageData] = useState(null);

    async function lookupPage(e) {
        e.preventDefault();
        let pageData = await justSinglePageData(pageID)
        setPageData(pageData);
    }

    async function updatePageData() {
        let pageData = await justSinglePageData(pageID)
        setPageData(pageData);
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
            {pageData !== null && pageData !== undefined ? <UpdatePageForm pageData={pageData} postUpdateHook={updatePageData}/> : null}
            {pageData === undefined ? <div>Error: No page found with that uuid</div> : null}
        </div>
    )
}