import PageDetailsCard from '../PageDetailsCard';
import SupportUsCard from '../../generic/SupportUs/SupportUsCard';

export default function DesktopReadPageCards(props) {
    return (
        <div className="desktopReadPageCardsWrapper mx-8 mt-12">
            <div className="desktopReadPageCardsDetails bg-white">
                <PageDetailsCard pageId={props.pageId} />
            </div>
            <div className="desktopReadPageCardsSupport bg-white">
                <SupportUsCard />
            </div>
        </div>
        
    )
}