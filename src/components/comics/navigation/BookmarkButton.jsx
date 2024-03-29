export default function BookmarkButton(props) {
  return (
    <div
      className={`bookmarkBtnDims hover-wiggle cursor-pointer justify-self-center ${
        props.isMobile ? null : "mb-4"
      } self-center bg-white p-4 m-2 rounded-full drop-shadow-lg`}
      onClick={() => props.setBookmark(props.pageId.toString())}
    >
      <img
        src={props.bookmarkIcon}
        width={40}
        alt="bookmark button"
        className="ml-auto mr-auto"
      />
    </div>
  );
}
