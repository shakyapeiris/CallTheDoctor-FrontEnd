import React, { useContext } from "react";
import { LocationContext } from "../../Context/LocationContext";
import "./Home.css";
import SOSBtn from '../../images/sos.png'
import { Link } from "react-router-dom";


function Home() {

    const locationCtx = useContext(LocationContext)

  const sendNotification = async () => {

      const response = await fetch("https://callthedoctorapi.herokuapp.com/user/notify", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cordinates: {
                lat: locationCtx.lat,
                long: locationCtx.long
            },
            userId: localStorage.getItem('loginId'),
          })
      })
      const data = await response.json();
      alert(data.message)
  };

  return (
    <div>
      <Link className="profile-btn" to={"/profile"}>Profile</Link>
      <main className="content">
        <h3>Warning!</h3>
        <p className="alert">
          Please note that once you’ve pressed the SOS button and accept the
          warning on the next page, there’s no turning back and an emergency
          medical team will arrive at your live location,
        </p>
        <div className="sos-btn" onClick={sendNotification}>
          <img src={SOSBtn} style={{ height: "100%" }} alt="buttonimage"/>
        </div>
        <p>A fine will be charges for any misuse of the service.</p>
      </main>
    </div>
  );
}

export default Home;
