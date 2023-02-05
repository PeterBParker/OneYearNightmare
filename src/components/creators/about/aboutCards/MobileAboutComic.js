import Header from "../../../header/Header";
import TextCard from "../../../generic/TextCard";
import MobileAboutCreators from "./MobileAboutCreators";
import LinkButton from "../../../generic/LinkButton";

export default function MobileAboutComic(props) {
  return (
    <div>
      <Header defaultBg={false} />
      <div className="aboutTheComicContainer bg-white grid">
        <div className="aboutTheComicText">
          <TextCard
            header="About the Comic"
            content={props.comicText}
            isDesktop={false}
          />
        </div>
        <div className="readButtonContainer justify-contents-start clearfix mb-12">
          <div className="">
            <LinkButton
              to="/read"
              styles="readButton font-body font-medium text-xl bg-cream-light rounded-xl px-4 py-2 float-left ml-8"
              buttonContent="START READING"
            />
          </div>
        </div>
      </div>
      <MobileAboutCreators {...props} />
    </div>
  );
}
