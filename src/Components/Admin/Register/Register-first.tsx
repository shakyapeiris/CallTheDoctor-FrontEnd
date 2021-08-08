import React, { FormEventHandler, useContext, useState } from "react";
import Input from "../../UI/Input";
import useInput from "../../../Hooks/useInput";

//Style
import "./Register.css";
import { LocationContext } from "../../../Context/LocationContext";

function RegisterStep1() {
  const ctx = useContext(LocationContext)
  const [isSecond, setIsSecond] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const {
    inputValue: nameInputValue,
    isInputValid: isNameInputValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  } = useInput((inputValue) => inputValue.trim() !== "");

  const {
    inputValue: addressInputValue,
    isInputValid: isAddressInputValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressResetHandler,
  } = useInput((inputValue) => inputValue.trim() !== "");


  const {
    inputValue: numberInputValue,
    isInputValid: isNumberInputValid,
    hasError: numberHasError,
    valueChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
    reset: numberResetHandler,
  } = useInput((inputVal) => !inputVal.includes(" ") && inputVal.length === 10);

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

  const gotoSecond = () => {
    if (!isNameInputValid) return nameBlurHandler();
    if (!isAddressInputValid) return addressBlurHandler();
    if (!isNumberInputValid) return numberBlurHandler();
    setIsSecond(true);
  };



  

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
      const url = "https://callthedoctorapi.herokuapp.com/admin/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInputValue,
          cordinates: ctx,
          contactNo: numberInputValue,
          email: emailInputValue,
          password: passwordInputValue,
        }),
      });
      const data = await response.json();
      setMessage(data.message);
      setSending(false);
      resetEmail();
      resetPassword();
      nameResetHandler();
      addressResetHandler();
      numberResetHandler();
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
        <h2 style={{ textAlign: "center" }}>Admin Sign Up</h2>
        {isSecond ? (
          <>
            <div>
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
            </div>
            {message === "Admin added successfully." ? (
              <div className="success">{message + " Wait For the Verification"}</div>
            ) :
              <div className="error">
                {message}
              </div>
            }

            <button
              className="next"
              type="button"
              onClick={() => {
                setIsSecond(false);
              }}
            >
              Back
            </button>
            <button className="next" type="submit">
              {sending ? "Sending..." : "SignUp"}
            </button>
          </>
        ) : (
          <div>
            <Input
              placeholder="Branch Name"
              value={nameInputValue}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              type="text"
            />
            {nameHasError && <div className="error">Enter a valid name</div>}

            <Input
              placeholder="Address"
              value={addressInputValue}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
              type="text"
            />
            {addressHasError && (
              <div className="error">Enter a valid Address</div>
            )}
            <Input
              placeholder="Contact Number"
              value={numberInputValue}
              onChange={numberChangeHandler}
              onBlur={numberBlurHandler}
              type="number"
            />
            {numberHasError && (
              <div className="error">Enter a valid Number</div>
            )}
            <button className="next" type="button" onClick={gotoSecond}>
              Next
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterStep1;
