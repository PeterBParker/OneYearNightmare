import ArchiveContent from "./ArchiveContent";
import Header from "../../header/Header";

export default function ArchiveMobile(props) {
    return(
        <div className="archiveMobilePage">
            <Header defaultBg={true}/>
            <ArchiveContent />
        </div>    
    )
}