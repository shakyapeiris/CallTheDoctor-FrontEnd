import React, { useContext, useEffect, useCallback, useState } from "react";
import { LocationContext } from "../../Context/LocationContext";
import Home from "../../Components/Client/UserHome/Home";
import { useHistory, useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

function UserHome() {
  const locationCtx = useContext(LocationContext);
  const {userId} = useParams<{userId: string}>();
  const authCtx = useContext(AuthContext)
  const history = useHistory();

  
  
  const [isValidating, setIsValidating] = useState(false)
  const sendNotification = async () => {
    const response = await fetch(
      `${process.env.BACK_END_CLIENT}notify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cordinates: {
            lat: locationCtx.lat,
            long: locationCtx.long,
          },
          userId: localStorage.getItem("loginId"),
        }),
      }
    );
    const data = await response.json();
    alert(data.message);
  };

  const verifyUser = useCallback(async() => {
    setIsValidating(true)
    const url = `${process.env.REACT_APP_BACK_END_CLIENT}verify/${userId}`;
    const response = await fetch(url);
    const data = await response.json()
    console.log(data)
    if (!data.validated){
      history.replace("/login")
      authCtx.logout();
    }
    setIsValidating(false)
  }, [userId, authCtx, history])

  useEffect(() => {
    try{
      verifyUser();
    }
    catch(err){
      console.log(err)
    }
  }, [verifyUser])
  
  return (
    <div>
      {!isValidating && <Home userId={userId} onClick={sendNotification} />}
    </div>
  );
}

export default UserHome;
