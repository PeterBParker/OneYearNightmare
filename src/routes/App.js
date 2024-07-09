import "../styling/App.css";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="App">
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
