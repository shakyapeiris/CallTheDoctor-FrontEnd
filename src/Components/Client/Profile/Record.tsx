import React from "react";
import { Link } from "react-router-dom";

interface Props{
    _id: string;
    cause: string;
    date: Date;
}

function Record(props: Props) {
  return (
    <div className="container2" key={props._id}>
      <Link to={"/records/" + props._id} className="lin">
        <h1>{props.cause}</h1>
      </Link>
      <p>{props.date}</p>
    </div>
  );
}

export default Record;
