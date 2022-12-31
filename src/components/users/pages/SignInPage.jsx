import React from "react";
import Header from "../../header/Header";
import SignInToUserProfile from "../components/SignInToUserProfile";
import SimpleNavBar from "../../comics/navigation/desktop/SimpleNavBar";
import Pages from "../../comics/navigation/desktop/Pages";
import { useMediaQuery } from "react-responsive";
import querySizes from "../../../styling/breakpoints.json";

const SignInPage = () => {
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });

  return (
    <React.Fragment>
      <Header defaultBg={true} />
      {isDesktop ? <SimpleNavBar page={Pages.SIGNIN} /> : ""}
      <div className="my-12" id="user-signed-out">
        <SignInToUserProfile />
      </div>
      <div id="user-signed-in"></div>
    </React.Fragment>
  );
};

export default SignInPage;
