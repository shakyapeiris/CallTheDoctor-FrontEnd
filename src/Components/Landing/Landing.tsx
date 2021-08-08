import React from "react";
import Classes from './Landing.module.css'
import SOSBtn from '../../images/sos.png'
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <header className={Classes.topBar}>CALL THE DOCTOR</header>
      <div className={Classes.content}>
        <div className={Classes.recommended}>
          <h3>Recommended</h3>
          <Link to="/login">
            <div>
              <button>Log in</button>
            </div>
          </Link>
          <Link to="/signup">
            <div>
              <button>Sign Up</button>
            </div>
          </Link>
        </div>
        <div className={Classes.instant}>
          <h3>Warning!</h3>
          <p>
            Please note that once you’ve pressed the SOS button and accept the
            warning on the next page, there’s no turning back and an emergency
            medical team will arrive at your live location,
          </p>
          <div className={Classes.sosBtn}>
            <img src={SOSBtn} style={{height: "100%",}} alt="sos-btn" />
          </div>
          <p>A fine will be charges for any misuse of the service.</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
