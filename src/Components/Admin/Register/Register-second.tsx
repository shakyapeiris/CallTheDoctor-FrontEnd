import React from "react";
import Input from "../../UI/Input";
import { RegisterAuthProps } from "../../../Types/interfaces";

function RegisterSecond(props: RegisterAuthProps) {
  return (
    <>
      <div>
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
      </div>
      {props.message === "Admin added successfully." ? (
        <div className="success">{props.message + " Wait For the Verification"}</div>
      ) : (
        <div className="error">{props.message}</div>
      )}

      <button
        className="next"
        type="button"
        onClick={() => {
          props.setSecond();
        }}
      >
        Back
      </button>
      <button className="next" type="submit">
        {props.sending ? "Sending..." : "SignUp"}
      </button>
    </>
  );
}

export default RegisterSecond;
