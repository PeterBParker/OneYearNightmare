import { bool } from "prop-types";
import { getDownloadURL, ref } from "firebase/storage";
import EmailSignUpModal from "../../email/EmailSignUpModal";
import { storage } from "../../..";
import { RSS_FILE_PATH } from "../../../api/RefKeys";
import { useEffect } from "react";

export default function NotifySignUpBanner(props) {
  const RSS_LINK_ID = "rss-link";
  let rssFileRef = ref(storage, RSS_FILE_PATH)

  // Write a React Effect that fetches the RSS File Download url and updates the href of the RSS link
  useEffect(() => {
    getDownloadURL(rssFileRef).then((url) => {
      let rssLink = document.getElementById(RSS_LINK_ID);
      console.log("RSS Link: ", rssLink);
      rssLink.href = url;
    }).catch((error) => {
      // Todo implement logging
      console.log("Error getting RSS file download url: ", error);
    });
  }, [rssFileRef]);

  return (
    <div
      className={`notification-signup-banner ml-auto mr-auto justify-center ${
        props.isDesktop ? "py-6" : "pb-6 pt-2 bg-white"
      } items-center flex-wrap`}
    >
      <div className={` ${props.isDesktop ? "text-left" : null} `}>
        <div
          className={`text-2xl text-grey-dark font-header ${
            props.isDesktop ? "mr-4 font-bold" : "pb-2 font-semibold"
          }`}
        >
          {"Get Notified of New Pages!"}
        </div>
      </div>
      <div
        className={`flex flex-row flex-wrap gap-y-3 ${
          props.isDesktop ? "justify-end" : "justify-center"
        } text-grey-dark font-body`}
      >
        <a
          href="https://discord.gg/47DQVUnbD6"
          className="btn bg-cream-dark btn-std-hover rounded text-2xl font-medium px-4 py-2 text-grey-dark shrink-0"
        >
          Discord <i className="fa-brands fa-discord"></i>{" "}
        </a>
        <EmailSignUpModal />
        <a
          href=""
          id={RSS_LINK_ID}
          className="btn bg-cream-dark btn-std-hover rounded text-2xl font-medium px-4 py-2 text-grey-dark ml-4 shrink-0"
        >
          RSS <i className="fa-solid fa-rss"></i>{" "}
        </a>
      </div>
    </div>
  );
}

NotifySignUpBanner.propTypes = {
  isDesktop: bool,
};
