import discordBanner from "../../../assets/FINAL-ASSETS-072821/final assets/discord-banner-ill-CROPPED.png";
import loadable from "@loadable/component";
const PageDetailsCard = loadable(() => import("../PageDetailsCard"));
const Comments = loadable(() => import("../../comments/Comments"));

export default function DesktopReadPageCards(props) {
  return (
    <>
      <div className="desktopReadPageCardsWrapper mx-8 mt-12">
        <div className="desktopReadPageCardsDetails bg-white">
          <PageDetailsCard page={props.page} chapter={props.chapter} />
          <img
            src={discordBanner}
            width={120}
            className="readPageDiscordBannerImage ml-8"
            alt="discord link banner"
          />
        </div>
        <div className="desktopReadPageCardsSupport bg-white ">
          <Comments slug={props.page.uuid} comments={props.comments} />
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
          <div className="transition duration-500 ease-in-out bg-cream-dark hover-bump-center rounded text-2xl font-medium px-4 py-2 mr-8">
            <a href="https://discord.gg/47DQVUnbD6" className="">
              JOIN <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
