import React, { useCallback, useContext, useEffect, useState } from "react";
import UserProfile from "../../Components/Client/Profile/Profile";
import { useHistory, useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

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
  const { userId } = useParams<{ userId: string }>();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
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

  const verifyUser = useCallback(async () => {
    const url = `${process.env.REACT_APP_BACK_END_CLIENT}verify/${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (!data.validated) {
      history.replace("/login");
      authCtx.logout();
    }
  }, [userId, authCtx, history]);

  

  const fetcheData = useCallback(async () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_BACK_END_CLIENT + userId}`;
    localStorage.getItem("loginId");
    const response = await fetch(url);
    const ret = await response.json();
    setData(ret);
    setIsLoading(false);
    console.log(ret);
  }, [userId]);
  useEffect(() => {
    verifyUser();
    fetcheData();
  }, [fetcheData, verifyUser]);
  if (authCtx.loginId !== userId || userId === "") {
    history.push("/login");
    authCtx.logout();
  }
  return (
    <UserProfile
      name={data.name}
      age={data.age}
      gender={data.gender}
      address={data.address}
      diseases={data.diseases}
      contactNo={data.contactNo}
      records={data.records}
      isLoading={isLoading}
    />
  );
}

export default Profile;
