import React, { FormEventHandler, useContext, useState } from "react";
import Input from "../../UI/Input";
import useInput from "../../../Hooks/useInput";
import "./Login.css";
import { useHistory } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";

function Login() {
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [sending, setSending] = useState(false);
  const ctx = useContext(AuthContext);
  const {
    inputValue: emailInputValue,
    isInputValid: isEmailInputValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((inputValue) => inputValue.includes("@"));
  const {
    inputValue: passwordInputValue,
    isInputValid: isPasswordInputValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((inputValue) => inputValue.trim().length >= 6);

  const submitFormHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!isEmailInputValid) {
      emailBlurHandler();
      return;
    }

    if (!isPasswordInputValid) {
      passwordBlurHandler();
      return;
    }
    setSending(true);
    const sendData = async () => {
      const url = "https://callthedoctorapi.herokuapp.com/admin/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInputValue,
          password: passwordInputValue,
        }),
      });
      const data = await response.json();
      setSending(false);
      resetEmail();
      resetPassword();

      if (data.message === "User Logged In") {
        ctx.login(data.userId, () => {
          history.replace('/admin/' + data.userId)
        });
      } else {
        setMessage(data.message);
      }
    };

    try {
      sendData();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 style={{ color: "white", textAlign: "center", marginTop: "30px" }}>
        CALL THE DOCTOR
      </h1>
      <form className="container" onSubmit={submitFormHandler}>
        <h2 style={{ textAlign: "center" }}>Admin Login</h2>
        <Input
          placeholder="Email"
          value={emailInputValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="text"
        />
        {emailHasError && (
          <div className="error">Email must include @ symbol</div>
        )}
        <Input
          placeholder="Password"
          value={passwordInputValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          type="text"
        />
        {passwordHasError && (
          <div className="error">
            Length of the password must be greater than 6
          </div>
        )}
        {message && <div className="error">{message}</div>}
        <button className="next" type="submit">
          {sending ? "Sending..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
