import "../styling/App.css";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import querySizes from "../styling/breakpoints.json";
import Footer from "../components/Footer";
import Header from "../components/header/Header";

function App() {
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });
  return (
    <div className={`App ${isDesktop ? " desktopBg comicViewerDesktop" : ""}`}>
      <div className="shrink-0">
        <Header />
      </div>
      <div className="mxmContent">
        <Outlet />
      </div>
      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
}

export default App;
