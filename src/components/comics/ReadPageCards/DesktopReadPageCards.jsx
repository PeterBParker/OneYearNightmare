import PageDetailsCard from '../PageDetailsCard';
import SupportUsCard from '../../generic/SupportUs/SupportUsCard';

export default function DesktopReadPageCards(props) {
    return (
        <div className="desktopReadPageCardsWrapper mx-8 mb-24">
            <div className="desktopReadPageCardsDetails">
                <PageDetailsCard pageId={props.pageId} />
            </div>
            <div className="desktopReadPageCardsSupport">
                <SupportUsCard />
            </div>
        </div>
        
    )
}