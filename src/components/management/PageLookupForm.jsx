import { justSinglePageData } from "../../api/ComicPageAPI";
export default function PageLookupForm({handlePageData, pageID, setPageID}) {

    async function lookupPage(e) {
        e.preventDefault();
        let pageData = await justSinglePageData(pageID)
        handlePageData(pageData);
    }

    return(
        <form id="updatePageLookup" onSubmit={lookupPage}>
                <input type="text" className="rounded-lg text-lg py-3 px-3 my-2 w-full" placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" onChange={(e) => setPageID(e.target.value)}></input>
                <button type="submit" className="btn-std-hover btn my-2 py-2 w-full text-lg bg-mocha font-medium not-italic rounded">Look Up Page</button>
        </form>
    )
}