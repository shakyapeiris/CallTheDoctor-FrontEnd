import React, { FormEventHandler, useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

//Components
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import useInput from "../../Hooks/useInput";

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

  const submitFormHandler: FormEventHandler<HTMLFormElement> = async (e) => {
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

    const url = `${process.env.REACT_APP_BACK_END_CLIENT}login`;
    console.log(url);
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
        history.push("/user/" + data.userId);
      });
    } else {
      setMessage(data.message);
    }
  };
  return (
    <div>
      <h1 style={{ color: "white", textAlign: "center", marginTop: "30px" }}>
        CALL THE DOCTOR
      </h1>
      <form className="container" onSubmit={submitFormHandler}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
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
        <Button
          type="submit"
          onClick={() => {
            console.log("Something");
          }}
        >
          {sending ? "Validatiing..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

export default Login;
