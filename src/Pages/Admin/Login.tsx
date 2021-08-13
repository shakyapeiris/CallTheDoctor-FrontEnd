import React, { FormEventHandler, useContext, useState } from "react";
import AdminLogin from "../../Components/Admin/Login/Login";
import useInput from "../../Hooks/useInput";
import { useHistory } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [sending, setSending] = useState(false);
  const ctx = useContext(AuthContext);
  const email = useInput((inputValue) => inputValue.includes("@"));
  const password = useInput((inputValue) => inputValue.trim().length >= 6);

  const submitFormHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!email.isInputValid) {
      email.inputBlurHandler();
      return;
    }

    if (!password.isInputValid) {
      password.inputBlurHandler();
      return;
    }
    setSending(true);
    const sendData = async () => {
      const url = `${process.env.REACT_APP_BACK_END_ADMIN}login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.inputValue,
          password: password.inputValue,
        }),
      });
      const data = await response.json();
      setSending(false);
      password.reset();
      email.reset();

      if (data.message === "User Logged In") {
        ctx.login(data.userId, () => {
          history.replace("/admin/" + data.userId);
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
      <AdminLogin email={email} password={password} sending={sending} message={message} submit={submitFormHandler} />
    </div>
  );
}

export default Login;
