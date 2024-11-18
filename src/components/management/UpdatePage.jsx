import { useState } from "react";
import { justSinglePageData } from "../../api/ComicPageAPI";
import UpdatePageForm from "./UpdatePageForm";
import PageLookupForm from "./PageLookupForm";

export default function UpdatePage() {
    const [pageID, setPageID] = useState(null);
    const [pageData, setPageData] = useState(null);

    async function updatePageData() {
        let pageData = await justSinglePageData(pageID)
        setPageData(pageData);
    }

    // On Page Lookup, it will display the title, message, and page icon
    // The title will the placeholder be in an editable input field, the message will be in an editable textarea
    // There will be a upload image button that will update the page icon display
    return (
        <div>
            {pageData !== null && pageData !== undefined ? 
                <UpdatePageForm pageData={pageData} postUpdateHook={updatePageData}/>
                :
                <PageLookupForm handlePageData={setPageData} pageID={pageID} setPageID={setPageID}/>
            }
            {pageData === undefined ? <div>Error: No page found with that uuid</div> : null}
        </div>
    )
}