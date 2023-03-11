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
      } py-3`}
    >
      <FirstPageButton
        pageId={props.pageId}
        clickEffects={props.clickEffects}
      />
      <BackButton pageId={props.pageId} clickEffects={props.clickEffects} />
      <BookmarkButton
        setBookmark={props.setBookmark}
        pageId={props.pageId}
        bookmarkIcon={props.bookmarkIcon}
      />
      <NextButton pageId={props.pageId} clickEffects={props.clickEffects} />
      <LastPageButton pageId={props.pageId} clickEffects={props.clickEffects} />
    </div>
  );
}
