//Modules
import React from "react";

//Components
import TopBar from "../../Components/Landing/TopBar";
import AuthLinks from "../../Components/Landing/AuthLinks";
import InstantSup from "../../Components/Landing/InstantSup";

//Styles
import classes from "./Styles/LandingPage.module.css";

function Landing() {
  return (
    <>
      <TopBar />
      <div className={classes.content}>
        <AuthLinks />
        <InstantSup />
      </div>
    </>
  );
}

export default Landing;
