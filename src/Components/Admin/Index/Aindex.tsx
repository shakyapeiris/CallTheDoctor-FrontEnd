import React from "react";
import classes from "./Index.module.css";
import { Link } from "react-router-dom";
import { AdminHome } from "../../../Types/interfaces";

function Index(props: AdminHome) {
  return (
    <div>
      {!props.loading ? (
        props.data.length > 0 ? (
          props.data.map((i: any, index: number) => {
            return (
              <div className={classes.Container} key={index}>
                <Link style={{color: "black"}} to={"/records/" + i._id}>{i._id}</Link>
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
