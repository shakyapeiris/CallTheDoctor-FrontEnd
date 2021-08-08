import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Details from "../Components/Recording/Details";
import Map from "../Components/Recording/Map";
import classes from "./Record.module.css";

function Record() {
  const { recordId } = useParams<{ recordId: string }>();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://callthedoctorapi.herokuapp.com/records/" + recordId;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [recordId]);
  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: "center", color: "white" }}>Loading...</h1>
      ) : (
        <div className={classes.container}>
          <div
            className={classes.Holder}
          >
            <Map recordId={recordId} long={data.location.long} lat={data.location.lat} userId={data.portalId} />
          </div>
          <div
            className={classes.Holder}
          >
            <Details
              name={data.patientId.name}
              age={data.patientId.age}
              diseases={data.patientId.diseases}
              contactNo={data.patientId.contactNo || "0775532529"}
              gender={data.patientId.gender}
              records={data.pastRecords}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Record;
