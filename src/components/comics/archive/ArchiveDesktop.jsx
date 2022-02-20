import Header from "../../header/Header";
import SimpleNavBar from "../navigation/desktop/SimpleNavBar";
import Pages from "../navigation/desktop/Pages";
import ArchiveContent from "./ArchiveContent";

export default function ArchiveDesktop(props) {
    return(
        <div className="pb-24">
            <Header/>
            <SimpleNavBar page={Pages.ARCHIVE}/>
            <ArchiveContent/>
        </div>
    )
}