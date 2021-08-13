import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Pusher from "pusher-js";

import AdminIndex from "../../Components/Admin/Index/Aindex";
import { AuthContext } from "../../Context/AuthContext";

function Index() {
  const { adminId } = useParams<{ adminId: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const fetchData = useCallback(async () => {
    const url = `${process.env.REACT_APP_BACK_END_ADMIN + adminId}`;
    const response = await fetch(url);
    const data = await response.json();
    const temp = [];
    for (var key in data) {
      temp.push(data[key]);
    }
    console.log(temp);
    setData(temp);
    setLoading(false);
  }, [adminId]);

  const verifyUser = useCallback(async () => {
    const url = `${process.env.REACT_APP_BACK_END_ADMIN}verify/${adminId}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (!data.validated || adminId !== authCtx.loginId) {
      history.replace("/admin/login");
      authCtx.logout();
    }
  }, [adminId, authCtx, history]);

  var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY || '', {
    cluster: "mt1",
  });

  var channel = pusher.subscribe("my-channel");
  channel.bind(adminId, function (newRecord: any) {
    const items = [...data, newRecord];
    setData(items);
  });

  useEffect(() => {
    verifyUser();
    fetchData();
  }, [fetchData, verifyUser]);
  return (
    <div>
      <AdminIndex data={data} loading={loading} />
    </div>
  );
}

export default Index;
