import React from "react";
import Header from "../components/header/Header";
import SignInToUserProfile from "../components/users/components/SignInToUserProfile";
import SimpleNavBar from "../components/comics/navigation/desktop/SimpleNavBar";
import Pages from "../components/comics/navigation/desktop/Pages";
import { useMediaQuery } from "react-responsive";
import querySizes from "../styling/breakpoints.json";

const SignInPage = () => {
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });

  return (
    <React.Fragment>
      <Header defaultBg={false} />
      {/* TODO Move the navbar to the header and get what the current page is from the url */}
      {isDesktop ? <SimpleNavBar page={Pages.SIGNIN} /> : ""}
      <div className="mb-12" id="user-signed-out">
        <SignInToUserProfile />
      </div>
      <div id="user-signed-in"></div>
    </React.Fragment>
  );
};

export default SignInPage;
