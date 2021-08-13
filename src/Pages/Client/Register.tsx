import React, { useState, ChangeEvent, FormEventHandler } from "react";
import useInput from "../../Hooks/useInput";
import RegisterFirst from "../../Components/Client/Register/Register-first";
import RegisterSecond from "../../Components/Client/Register/Register-second";

import classes from "./Styles/RegisterPage.module.css";

function Register() {
  const [isSecond, setIsSecond] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const name = useInput((inputValue) => inputValue.trim() !== "");

  const address = useInput((inputValue) => inputValue.trim() !== "");

  const age = useInput(
    (inputValue) => new Date().getTime() - new Date(inputValue).getTime() > 0
  );

  const number = useInput(
    (inputVal) => !inputVal.includes(" ") && inputVal.length === 10
  );

  const email = useInput((inputValue) => inputValue.includes("@"));
  const password = useInput((inputValue) => inputValue.trim().length >= 6);

  const gotoSecond = () => {
    if (!name.isInputValid) return name.inputBlurHandler();
    if (!age.isInputValid) return age.inputBlurHandler();
    if (!address.isInputValid) return age.inputBlurHandler();
    if (!number.isInputValid) return number.inputBlurHandler();
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

  const gender = useState("");

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
      const url = `${process.env.REACT_APP_BACK_END_CLIENT}register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.inputValue,
          age: new Date(age.inputValue).getTime(),
          gender: gender[0],
          diseases,
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
      age.reset();
      address.reset();
      number.reset();
    };

    try {
      sendData();
    } catch (err) {
      console.log(err);
    }
  };
  const diseaseContainer = (
    <div className={classes.diseasesContainer}>
      <label>Diseases</label>
      <div className={classes.diseases}>
        {diseases.map((d, index) => {
          return (
            <div
              className={classes.disease}
              onClick={() => {
                removeDiseases(index);
              }}
            >
              {d}
            </div>
          );
        })}
      </div>
      <div className={classes.diseaseController}>
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
  );
  return (
    <>
      <div>
        <h1 style={{ color: "white", textAlign: "center", marginTop: "30px" }}>
          CALL THE DOCTOR
        </h1>
        <form className="container" onSubmit={submitFormHandler}>
          <h2 style={{ textAlign: "center" }}>Sign Up</h2>
          {isSecond ? (
            <RegisterSecond
              email={email}
              password={password}
              message={message}
              sending={sending}
              setSecond={gotoSecond}
            />
          ) : (
            <>
              <RegisterFirst
                name={name}
                age={age}
                address={address}
                number={number}
                gender={gender}
                setSecond={gotoSecond}
                diseaseCont={diseaseContainer}
              />
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default Register;
