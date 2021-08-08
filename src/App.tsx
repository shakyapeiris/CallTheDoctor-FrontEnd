import React from "react";
import { Route, Switch } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Record from "./Pages/Record";
import Register from "./Pages/Register";
import UserHome from "./Pages/UserHome";

import AdminLogin from './Pages/Admin/Login'
import AdminRegister from './Pages/Admin/Register'
import AdminIndex from "./Pages/Admin/AdIndex";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <Register />
      </Route>
      <Route path="/user/:userId" exact>
        <UserHome />
      </Route>
      <Route path="/profile" exact>
        <Profile />
      </Route>
      <Route path="/records/:recordId" exact>
        <Record />
      </Route>
      <Route path="/admin/login" exact>
          <AdminLogin />
      </Route>
      <Route path="/admin/register" exact>
          <AdminRegister />
      </Route>
      <Route path="/admin/:adminId" exact>
          <AdminIndex />
      </Route>
    </Switch>
  );
}

export default App;
