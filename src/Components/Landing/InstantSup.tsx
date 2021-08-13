//Modules
import React from "react";

//Styles
import classes from "./Landing.module.css";

//Images
import SOSBtn from "../../images/sos.png";

function Landing() {
  return (
    <div className={classes.instant}>
      <h3>Warning!</h3>
      <p>
        Please note that once you’ve pressed the SOS button and accept the
        warning on the next page, there’s no turning back and an emergency
        medical team will arrive at your live location,
      </p>
      <div className={classes.sosBtn}>
        <img src={SOSBtn} style={{ height: "100%" }} alt="sos-btn" />
      </div>
      <p>A fine will be charges for any misuse of the service.</p>
    </div>
  );
}

export default Landing;
