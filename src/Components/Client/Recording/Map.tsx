import React, { useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import useInput from "../../../Hooks/useInput";
import Input from "../../UI/Input";

import classes from "./Details.module.css";
import { useHistory } from "react-router";
import "../../../../node_modules/mapbox-gl/dist/mapbox-gl.css";

interface Props {
  lat: number;
  long: number;
  userId: string;
  recordId: string;
}

interface VP {
  latitude: number;
  longitude: number;
  width: string;
  maxPitch: number;
  height: string;
  zoom: number;
}

const Map = (props: Props) => {
  const [resolve, setResolve] = useState(false);
  const history = useHistory();

  const [viewPort, setViewPort] = useState<VP>({
    latitude: props.lat,
    longitude: props.long,
    maxPitch: 85,
    width: "100%",
    height: "400px",
    zoom: 5,
  });

  const ctx = localStorage.getItem("loginId");

  const {
    inputValue: emailInputValue,
    isInputValid: isEmailInputValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((inputValue) => inputValue.trim() !== "");

  const sendCause = async (e: any) => {
    e.preventDefault();
    if (!isEmailInputValid) return emailBlurHandler();
    setResolve(true);
    const url =
      "https://callthedoctorapi.herokuapp.com/records/" + props.recordId;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cause: emailInputValue,
      }),
    });
    const data = await response.json();
    setResolve(false);
    resetEmail();
    console.log(data);
    history.push("/admin/" + props.userId);
  };
  return (
    <>
      <ReactMapGl
        {...viewPort}
        mapboxApiAccessToken={
          "pk.eyJ1Ijoic2hha3lhcGVpcmlzIiwiYSI6ImNrczIzeHVrcDFpcnAycW1yanF0MnphNDYifQ.29Sg9uEMz8uacB-tjWgVwg"
        }
        onViewportChange={(viewPort: VP) => setViewPort(viewPort)}
        mapStyle="mapbox://styles/shakyapeiris/cks24cavn5dit17o5lskpj3db"
        className={classes.mapClasses}
      >
        <Marker latitude={props.lat} longitude={props.long}>
          <button>Alert</button>
        </Marker>
      </ReactMapGl>
      {ctx === props.userId ? (
        <form onSubmit={sendCause} className={classes.Container}>
          <Input
            placeholder="Cause/Reason"
            value={emailInputValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type="text"
          />
          {emailHasError && <div className="error">Enter a valid cause</div>}
          <button className="next" type="submit">
            {resolve ? "Submitting..." : "Submit"}
          </button>
        </form>
      ) : null}
    </>
  );
};

export default Map;
