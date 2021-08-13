//Modules
import React from "react";
import { Link } from "react-router-dom";

//Styles
import classes from "./Landing.module.css";

function AuthLinks() {
  return (
    <div className={classes.recommended}>
      <h3>Recommended</h3>
      <Link to="/login">
        <div>
          <button>Log in</button>
        </div>
      </Link>
      <Link to="/register">
        <div>
          <button>Sign Up</button>
        </div>
      </Link>
      <p style={{ textAlign: "center", color: "skyblue" }}>
        <Link to="/admin/login" style={{color: "dodgerblue"}}>Are you an admin? Sign In</Link>
      </p>
    </div>
  );
}

export default AuthLinks;
