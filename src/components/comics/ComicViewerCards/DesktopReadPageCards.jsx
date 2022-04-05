import PageDetailsCard from '../PageDetailsCard';
import SupportUsCard from '../../generic/SupportUs/SupportUsCard';
import Comments from '../../comments/Comments';
import ComicPageAPI from '../../../api/ComicPageAPI';

import discordBanner from '../../../assets/FINAL-ASSETS-072821/final assets/discord-banner-ill-CROPPED.png'

export default function DesktopReadPageCards(props) {

    const testCommentData = [
        {
            author_name: "Nathan Harris",
            time: new Date(),
            content: "Wow! I almost got into Harvard! This is a crazy long story about my journey with applying to Harvard and how I was inspired by THIS VERY page. Anyway, I'm kinda rambling now, but I just really wanted to drive home how much I love what you guys are doing and respect the creative hustle and drive to bring something exciting and enriching into this world. Best of luck in your publishing journey and if you ever crowd source this let me know! :)",
            id: 1
        },
        {
            author_name: "Morghan Harris",
            time: new Date(),
            content: "This takes me back to when I got into Harvard lol",
            id: 2 
        },
        {
            author_name: "Sami Harris",
            time: new Date(),
            content: "Cool story, bro.",
            parent_comment_id: 1,
            id: 3
        },
        {
            author_name: "Penee ONeil",
            time: new Date(),
            content: "Wow! Maybe you and Morghan could've met there!",
            parent_comment_id: 1,
            id: 4
        }
    ]
    const page_uuid = ComicPageAPI.getPageUuid(props.pageId)
    return (
        <>
        <div className="desktopReadPageCardsWrapper mx-8 mt-12">
            <div className="desktopReadPageCardsDetails bg-white">
                <PageDetailsCard pageId={props.pageId} />
                <img src={discordBanner} width={120} className="readPageDiscordBannerImage ml-8" alt="discord link banner"/>
            </div>
            <div className="desktopReadPageCardsSupport bg-white ">
                {page_uuid ? <Comments slug={page_uuid} comments={testCommentData}/> : <SupportUsCard />}
            </div>
            <div className="desktopReadPageDiscordBanner mt-6 justify-between py-6 items-center">
                <div className="desktopReadPageDiscordBannerText text-left ">
                    <div className="font-bold text-2xl">
                        {"Get Notified of New Pages!"}
                    </div>
                    <div className="text-lg">
                        {"new page notifications | comment & hang"}
                    </div>
                </div>
                    <div className="transition duration-500 ease-in-out bg-cream-dark hover:bg-eggshell rounded-md text-2xl font-medium px-4 py-2 mr-8">
                    <a href="https://discord.gg/47DQVUnbD6" className="">
                        JOIN →
                    </a>
                    </div>
                    
            </div>
        </div>
        </>
    )
}