import React, { FormEventHandler, useContext, useState } from "react";
import AdminRegStep01 from "../../Components/Admin/Register/Register-first";
import AdminRegStep02 from "../../Components/Admin/Register/Register-second";
import useInput from "../../Hooks/useInput";
import { LocationContext } from "../../Context/LocationContext";

function Register() {
  const locationCtx = useContext(LocationContext);
  const [isSecond, setIsSecond] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const name = useInput((inputValue) => inputValue.trim() !== "");

  const address = useInput((inputValue) => inputValue.trim() !== "");

  const number = useInput(
    (inputVal) => !inputVal.includes(" ") && inputVal.length === 10
  );

  const email = useInput((inputValue) => inputValue.includes("@"));

  const password = useInput((inputValue) => inputValue.trim().length >= 6);

  const gotoSecond = () => {
    if (!name.isInputValid) return name.inputBlurHandler();
    if (!address.isInputValid) return address.inputBlurHandler();
    if (!number.isInputValid) return number.inputBlurHandler();
    setIsSecond(true);
  };

  const submitFormHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!email.isInputValid) {
      email.inputBlurHandler();
      return;
    }

    if (!email.isInputValid) {
      email.inputBlurHandler();
      return;
    }
    setSending(true);
    const sendData = async () => {
      const url = `${process.env.REACT_APP_BACK_END_ADMIN}register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.inputValue,
          cordinates: locationCtx,
          contactNo: number.inputValue,
          email: email.inputValue,
          password: password.inputValue,
        }),
      });
      const data = await response.json();
      setMessage(data.message);
      setSending(false);
      email.reset();
      password.reset();
      name.reset();
      address.reset();
      number.reset();
    };

    try {
      sendData();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        <h1 style={{ color: "white", textAlign: "center", marginTop: "30px" }}>
          CALL THE DOCTOR
        </h1>
        <form className="container" onSubmit={submitFormHandler}>
          <h2 style={{ textAlign: "center" }}>Admin Sign Up</h2>
          {isSecond ? (
            <AdminRegStep02
              email={email}
              password={password}
              setSecond={gotoSecond}
              sending={sending}
              message={message}
            />
          ) : (
            <AdminRegStep01
              name={name}
              address={address}
              number={number}
              setSecond={gotoSecond}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
