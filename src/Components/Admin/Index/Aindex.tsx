import React, { useCallback, useEffect, useState } from "react";
import classes from "./Index.module.css";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";

function Index(props: { adminId: string }) {
  console.log(props.adminId);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const fetchData = useCallback(async () => {
    const url = "https://callthedoctorapi.herokuapp.com/admin/" + props.adminId;
    const response = await fetch(url);
    const data = await response.json();
    const temp = [];
    for(var key in data){
        temp.push(data[key])
    }
    console.log(temp)
    setData(temp);
    setLoading(false);
  },[props.adminId]);

  var pusher = new Pusher("67a3346664a3e2867e68", {
    cluster: "mt1",
  });

  var channel = pusher.subscribe("my-channel");
  channel.bind(props.adminId, function (newRecord: any) {
    alert("A notification from a patient");
    const items = [...data, newRecord];
    setData(items);
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {!loading ? (
        data.length > 0 ? (
          data.map((i: any, index: number) => {
            return (
              <div className={classes.Container} key={index}>
                <Link to={"/records/" + i._id}>{i._id}</Link>
                <p>{i.date}</p>
              </div>
            );
          })
        ) : (
          <h1>No records</h1>
        )
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Index;
