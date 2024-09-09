import React from "react";
import SignInToUserProfile from "../components/users/components/SignInToUserProfile";
import { useMediaQuery } from "react-responsive";
import querySizes from "../styling/breakpoints.json";

const SignInPage = () => {
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });

  return (
    <React.Fragment>
      <div className="mb-12" id="user-signed-out">
        <SignInToUserProfile />
      </div>
      <div id="user-signed-in"></div>
    </React.Fragment>
  );
};

export default SignInPage;
