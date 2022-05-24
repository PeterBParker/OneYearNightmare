import React from "react";
import Header from "../../header/Header";
import SignInToUserProfile from "../SignInToUserProfile";

const SignInPage = () => {
  return (
    <React.Fragment>
      <Header defaultBg={true} />
      <div className="my-12" id="user-signed-out">
        <SignInToUserProfile />
      </div>
      <div id="user-signed-in"></div>
    </React.Fragment>
  );
};

export default SignInPage;
