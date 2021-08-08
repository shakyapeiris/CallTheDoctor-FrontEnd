import React, { ChangeEvent, FormEventHandler, useState } from "react";
import Input from "../UI/Input";
import useInput from "../../Hooks/useInput";

//Style
import "./Register.css";

function RegisterStep1() {
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
    inputValue: ageInputValue,
    isInputValid: isAgeInputValid,
    hasError: ageHasError,
    valueChangeHandler: ageChangeHandler,
    inputBlurHandler: ageBlurHandler,
    reset: ageResetHandler,
  } = useInput(
    (inputValue) => new Date().getTime() - new Date(inputValue).getTime() > 0
  );

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
    if (!isAgeInputValid) return ageBlurHandler();
    if (!isAddressInputValid) return addressBlurHandler();
    if (!isNumberInputValid) return numberBlurHandler();
    setIsSecond(true);
  };

  const [diseases, setDiseases] = useState<string[]>([]);
  const [diseaseValue, setDiseaseValue] = useState("");

  const diseaseChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDiseaseValue(e.target.value);
  };

  const addDisease = () => {
    setDiseases([...diseases, diseaseValue]);
    setDiseaseValue("");
  };

  const removeDiseases = (index: number) => {
    const temp = diseases.filter((i, id) => id !== index);
    setDiseases(temp);
  };

  const [gender, setGender] = useState("");

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
      const url = "https://callthedoctorapi.herokuapp.com/user/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInputValue,
          age: new Date(ageInputValue).getTime(),
          gender: gender,
          diseases,
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
      ageResetHandler();
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
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
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
            {message === "User added successfully." ? (
              <div className="success">User Added SuccessFully</div>
            ) : message === "Email repeated" ? (
              <div className="error">
                A user with the same email already exists
              </div>
            ) : null}

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
              placeholder="Name"
              value={nameInputValue}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              type="text"
            />
            {nameHasError && <div className="error">Enter a valid name</div>}
            <Input
              placeholder="Age"
              value={ageInputValue}
              onChange={ageChangeHandler}
              onBlur={ageBlurHandler}
              type="date"
            />
            {ageHasError && <div className="error">Enter a valid date</div>}

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
            <label
              style={{
                marginLeft: "7.5%",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            >
              Gender
            </label>
            <div className="radio-holder">
              <div>
                <input
                  type="radio"
                  name="gender"
                  className="radio"
                  checked={gender === "m"}
                  value="m"
                  onChange={(e) => {
                    setGender(e.target.checked ? e.target.value : "");
                  }}
                />
                <label>Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  className="radio"
                  value="f"
                  checked={gender === "f"}
                  onChange={(e) => {
                    setGender(e.target.checked ? e.target.value : "");
                  }}
                />
                <label>Female</label>
              </div>
              <div></div>
            </div>
            <div className="diseases-container">
              <label>Diseases</label>
              <div className="diseases">
                {diseases.map((d, index) => {
                  return <div className="disease" onClick={() => {removeDiseases(index)}}>{d}</div>;
                })}
              </div>
              <div className="disease-controller">
                <input
                  placeholder="Disease"
                  onChange={diseaseChangeHandler}
                  value={diseaseValue}
                />
                <button onClick={addDisease} type="button">
                  +
                </button>
              </div>
            </div>
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
