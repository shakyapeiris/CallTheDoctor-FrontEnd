import React from "react";
import { LoginProps } from "../../../Types/interfaces";
import Input from "../../UI/Input"

function Login(props: LoginProps) {
  
  return (
    <div>
      <h1 style={{ color: "white", textAlign: "center", marginTop: "30px" }}>
        CALL THE DOCTOR
      </h1>
      <form className="container" onSubmit={props.submit}>
        <h2 style={{ textAlign: "center" }}>Admin Login</h2>
        <Input
          placeholder="Email"
          value={props.email.inputValue}
          onChange={props.email.valueChangeHandler}
          onBlur={props.email.inputBlurHandler}
          type="text"
        />
        {props.email.hasError && (
          <div className="error">Email must include @ symbol</div>
        )}
        <Input
          placeholder="Password"
          value={props.password.inputValue}
          onChange={props.password.valueChangeHandler}
          onBlur={props.password.inputBlurHandler}
          type="text"
        />
        {props.password.hasError && (
          <div className="error">
            Length of the password must be greater than 6
          </div>
        )}
        {props.message && <div className="error">{props.message}</div>}
        <button className="next" type="submit">
          {props.sending ? "Sending..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
