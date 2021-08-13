//Modules
import React from "react";
import { Link } from "react-router-dom";

//Styles
import classes from "./Home.module.css";

//Images
import SOSBtn from '../../../images/sos.png'

function Home(props: {onClick: () => void, userId: string}){
  return (
    <div>
      <Link className={classes.ProfileBtn} to={"/profile/" + props.userId}>Profile</Link>
      <main className={classes.content}>
        <h3>Warning!</h3>
        <p className={classes.alert}>
          Please note that once you’ve pressed the SOS button and accept the
          warning on the next page, there’s no turning back and an emergency
          medical team will arrive at your live location,
        </p>
        <div className={classes.sosBtn} onClick={props.onClick}>
          <img src={SOSBtn} style={{ height: "100%" }} alt="buttonimage"/>
        </div>
        <p>A fine will be charges for any misuse of the service.</p>
      </main>
    </div>
  );
}

export default Home;
