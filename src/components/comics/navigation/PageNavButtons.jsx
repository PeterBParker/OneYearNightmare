import BackButton from "./BackButton";
import NextButton from "./NextButton";
import FirstPageButton from "./FirstPageButton";
import LastPageButton from "./LastPageButton";
import BookmarkButton from "./BookmarkButton";

export default function PageNavButtons(props) {
  return (
    <div
      className={`${
        props.isMobile
          ? "flex flex-row content-center justify-center sticky bottom-0 frosted-glass-gradient"
          : "flex flex-col sticky top-0 content-center justify-center"
      }`}
    >
      <FirstPageButton clickEffects={props.clickEffects} />
      <BackButton clickEffects={props.clickEffects} />
      <BookmarkButton
        setBookmark={props.setBookmark}
        bookmarkIcon={props.bookmarkIcon}
        isMobile={props.isMobile}
      />
      <NextButton clickEffects={props.clickEffects} />
      <LastPageButton clickEffects={props.clickEffects} />
    </div>
  );
}
