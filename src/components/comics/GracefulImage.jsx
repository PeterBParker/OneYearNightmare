import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom/dist";
import { pageDataQuery } from "../../routes/ComicViewer";
import { PARAM_PAGE_UUID, PAGE_URL, PAGE_KEY } from "../../api/RefKeys";
import { BigSpinner } from "../generic/loading/Spinners";

export default function GracefulImage(props) {
  const params = useParams();
  const { data, isLoading } = useQuery(pageDataQuery(params[PARAM_PAGE_UUID]));

  if (isLoading) {
    <BigSpinner />;
  }

  // TODO fix this path issue
  const imageURL = data[PAGE_KEY][PAGE_URL];

  const loadedPageEffect = () => {
    document
      .getElementById("gracefulComicPage")
      .classList.remove("shimmerMask");
  };
  let loadedImage = (
    <img
      src={imageURL}
      alt={props.alt ? props.alt : ""}
      ref={props.reference ? props.reference : ""}
      id="gracefulComicPage"
      onLoad={() => loadedPageEffect()}
    />
  );

  return <div className="comicPage">{loadedImage}</div>;
}
