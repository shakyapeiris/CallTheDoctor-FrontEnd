import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./Profile.css";

interface Data {
  name: string;
  age: number;
  gender: string;
  address: string;
  diseases: string[];
  contactNo: string;
  records: { cause: string; date: Date; _id: string }[];
}

function Profile() {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState<Data>({
    name: "",
    age: 0,
    gender: "",
    address: "",
    diseases: [],
    contactNo: "",
    records: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetcheData = useCallback(async () => {
    setIsLoading(true);
    const url = "https://callthedoctorapi.herokuapp.com/user/" + ctx.loginId;
    const response = await fetch(url);
    const ret = await response.json();
    setData(ret);
    setIsLoading(false);
    console.log(ret);
  }, [ctx.loginId]);
  useEffect(() => {
    fetcheData();
  }, [fetcheData]);
  return (
    <div>
      <div>
        <h1 style={{ color: "white", textAlign: "center", margin: '30px' }}>
          Hello {data.name}
        </h1>

        {!isLoading ? (
          <>
            <div className="container2">
              <h2>Name: {data.name}</h2>
              <h2>Birthday: {new Date(data.age).toDateString()}</h2>
              <h2>Gender: {data.gender === "m" ? "Male" : "Female"}</h2>
              <h2>Disases: </h2>
              <div className="diseases-container2">
                <div className="diseases">
                  {data.diseases.map((d, index) => {
                    return (
                      <div key={index} className="disease">
                        {d}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h2>Contact Number: {data.contactNo}</h2>
            </div>
            <div>
              {data.records.map((i) => {
                return (
                  <div  className="container2" key={i._id}>
                    <Link to={"records/"+i._id} className="lin"><h1>{i.cause}</h1></Link>
                    <p>{i.date}</p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <h1 style={{ textAlign: "center", color: "white" }}>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default Profile;
