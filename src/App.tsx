import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "./Pages/Client/Profile";
import Landing from "./Pages/Client/Landing";
import Login from "./Pages/Client/Login";
import Record from "./Pages/Global/Record";
import Register from "./Pages/Client/Register";
import UserHome from "./Pages/Client/UserHome";

import AdminLogin from "./Pages/Admin/Login";
import AdminRegister from "./Pages/Admin/Register";
import AdminIndex from "./Pages/Admin/AdIndex";

import "./App.css";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { loginId } = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/" exact>
        {loginId === "" ? <Landing /> : <Redirect to={`/user/${loginId}`} />}
      </Route>
      <Route path="/login" exact>
        {loginId === "" ? <Login /> : <Redirect to={`/user/${loginId}`} />}
      </Route>
      <Route path="/register" exact>
        {loginId === "" ? <Register /> : <Redirect to={`/user/${loginId}`} />}
      </Route>
      <Route path="/user/:userId" exact>
        {loginId === "" ? <Redirect to="/login" /> : <UserHome />}
      </Route>
      <Route path="/profile/:userId" exact>
        {loginId === "" ? <Redirect to="/login" /> : <Profile />}
      </Route>
      <Route path="/records/:recordId" exact>
        <Record />
      </Route>
      <Route path="/admin/login" exact>
        {loginId === "" ? (
          <AdminLogin />
        ) : (
          <Redirect to={`/admin/${loginId}`} />
        )}
      </Route>
      <Route path="/admin/register" exact>
        {loginId === "" ? (
          <AdminRegister />
        ) : (
          <Redirect to={`/admin/${loginId}`} />
        )}
      </Route>
      <Route path="/admin/:adminId" exact>
        {loginId === "" ? <Redirect to="/login" /> : <AdminIndex />}
      </Route>
    </Switch>
  );
}

export default App;
