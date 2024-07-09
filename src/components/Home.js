import { Navigate } from "react-router-dom";
import { COMIC_VIEWER_PATH } from "../index";

export default function Home() {
  return <Navigate to={COMIC_VIEWER_PATH} />;
}
