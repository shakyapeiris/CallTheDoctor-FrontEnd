import React from "react";
import "./Profile.css";
import Record from "./Record";

interface Data {
  name: string;
  age: number;
  gender: string;
  address: string;
  diseases: string[];
  contactNo: string;
  records: { cause: string; date: Date; _id: string }[];
  isLoading: boolean;
}

function Profile(props: Data) {
  return (
    <div>
      <h1 style={{ color: "white", textAlign: "center", margin: "30px" }}>
        Hello {props.name}
      </h1>

      <>
        {!props.isLoading ? (
          <>
            <div className="container2">
              <h2>Name: {props.name}</h2>
              <h2>Birthday: {new Date(props.age).toDateString()}</h2>
              <h2>Gender: {props.gender === "m" ? "Male" : "Female"}</h2>
              <h2>Disases: </h2>
              <div className="diseases-container2">
                <div className="diseases">
                  {props.diseases.map((d, index) => {
                    return (
                      <div key={index} className="disease">
                        {d}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h2>Contact Number: {props.contactNo}</h2>
            </div>
            <div>
              {props.records.map((i) => {
                return (
                  <Record
                    _id={i._id}
                    cause={i.cause}
                    date={i.date}
                    key={i._id}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        )}
      </>
    </div>
  );
}

export default Profile;
