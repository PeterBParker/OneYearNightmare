import "../styling/App.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import querySizes from "../styling/breakpoints.json";
import Footer from "../components/Footer";
import Header from "../components/header/Header";

function App() {
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });
  useEffect(() => {
    const hideLoader = () => {
      const loader = document.getElementById("siteLoadingScreen");
      if (loader) {
        loader.classList.add("hidden");
      }
    };

    const waitForImagesToLoad = () => {
      const images = Array.from(
        document.getElementById("root").getElementsByTagName("img")
      ).filter((img) => img.loading !== "lazy");

      if (images.length === 0) {
        // No images, hide immediately after paint
        requestAnimationFrame(() => {
          requestAnimationFrame(hideLoader);
        });
        return;
      }

      const imagePromises = images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      });

      Promise.all(imagePromises).then(() => {
        // Double requestAnimationFrame ensures images are painted
        requestAnimationFrame(() => {
          requestAnimationFrame(hideLoader);
        });
      });
    };

    // Wait a tick for React to render child components with their images
    requestAnimationFrame(waitForImagesToLoad);
  }, []);
  return (
    <div className={`App ${isDesktop ? " desktopBg comicViewerDesktop" : "mt-8"}`}>
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
