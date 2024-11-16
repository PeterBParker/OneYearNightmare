import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { allPagesQuery } from "../../routes/Archive";
import { BigSpinner } from "../generic/loading/Spinners";
import { justSinglePageData } from "../../api/ComicPageAPI";

export default function UpdatePageForm() {
    const [pageID, setPageID] = useState(null);
    const [pageData, setPageData] = useState(null);

    async function lookupPage(e) {
        e.preventDefault();
        let pageData = await justSinglePageData(pageID)
        setPageData(pageData);
        console.log(pageData);
    }

    return (
        <div>
            <div className="text-left text-lg font-header">Update Page</div>
            <form id="updatePageLookup" onSubmit={lookupPage}>
                <input type="text" className="rounded-lg text-lg py-3 px-3 my-2 w-full" placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" onChange={(e) => setPageID(e.target.value)}></input>
                <button type="submit" className="btn-std-hover btn my-2 py-2 w-full text-lg bg-cream-confirm font-medium not-italic rounded">Look Up Page</button>
            </form>
        </div>
    )
}