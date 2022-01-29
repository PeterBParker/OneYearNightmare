import Header from "../../header/Header";
import SimpleNavBar from "../navigation/desktop/SimpleNavBar";
import Pages from "../navigation/desktop/Pages";
import ArchiveContent from "./ArchiveContent";

export default function ArchiveDesktop(props) {
    return(
        <div className="desktopDefaultBg desktopBg pb-24">
            <Header defaultBg={true}/>
            <SimpleNavBar page={Pages.ARCHIVE}/>
            <ArchiveContent/>
        </div>
    )
}