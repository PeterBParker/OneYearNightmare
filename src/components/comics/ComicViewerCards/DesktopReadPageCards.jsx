import PageDetailsCard from '../PageDetailsCard';
import SupportUsCard from '../../generic/SupportUs/SupportUsCard';
import Comments from '../../comments/Comments';
import ComicPageAPI from '../../../api/ComicPageAPI';
import {useEffect, useState} from 'react';
import {db} from '../../../index';
import {collection, query, where, getDocs} from "firebase/firestore/lite";

import discordBanner from '../../../assets/FINAL-ASSETS-072821/final assets/discord-banner-ill-CROPPED.png'

export default function DesktopReadPageCards(props) {
    const [comments, setComments] = useState([])


    const page_uuid = ComicPageAPI.getPageUuid(props.pageId)

    useEffect(async () => {
        const commentsQuery = query(collection(db, "page_comments"), where("page_id", "==", page_uuid));
        const querySnapshot = await getDocs(commentsQuery);
        let commentData = []
        querySnapshot.forEach((doc) => {
            commentData.push({id: doc.id, ...doc.data()})
        })
        setComments(commentData)
    }, [page_uuid])
    return (
        <>
        <div className="desktopReadPageCardsWrapper mx-8 mt-12">
            <div className="desktopReadPageCardsDetails bg-white">
                <PageDetailsCard pageId={props.pageId} />
                <img src={discordBanner} width={120} className="readPageDiscordBannerImage ml-8" alt="discord link banner"/>
            </div>
            <div className="desktopReadPageCardsSupport bg-white ">
                {page_uuid ? <Comments slug={page_uuid} comments={comments}/> : <SupportUsCard />}
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