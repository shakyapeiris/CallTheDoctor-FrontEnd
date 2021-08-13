import React from "react";
import { RegisterProps } from "../../../Types/interfaces";
import Input from "../../UI/Input";

import classes from './Register.module.css'



function RegisterStep1(props: RegisterProps) {
  
  return (
    <>
          <div>
            <Input
              placeholder="Name"
              value={props.name.inputValue}
              onChange={props.name.valueChangeHandler}
              onBlur={props.name.inputBlurHandler}
              type="text"
            />
            {props.name.hasError && <div className="error">Enter a valid name</div>}
            <Input
              placeholder="Age"
              value={props.age.inputValue}
              onChange={props.age.valueChangeHandler}
              onBlur={props.age.inputBlurHandler}
              type="date"
            />
            {props.age.hasError && <div className="error">Enter a valid date</div>}

            <Input
              placeholder="Address"
              value={props.address.inputValue}
              onChange={props.address.valueChangeHandler}
              onBlur={props.address.inputBlurHandler}
              type="text"
            />
            {props.address.hasError && (
              <div className="error">Enter a valid Address</div>
            )}
            <Input
              placeholder="Contact Number"
              value={props.number.inputValue}
              onChange={props.number.valueChangeHandler}
              onBlur={props.number.inputBlurHandler}
              type="number"
            />
            {props.number.hasError && (
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
            <div className={classes.radioHolder}>
              <div>
                <input
                  type="radio"
                  name="gender"
                  className={classes.radio}
                  checked={props.gender[0] === "m"}
                  value="m"
                  onChange={(e) => {
                    props.gender[1](e.target.checked ? e.target.value : "");
                    if (e.target.checked){
                      console.log(e.target.value)
                    }
                  }}
                />
                <label>Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  className={classes.radio}
                  value="f"
                  checked={props.gender[0] === "f"}
                  onChange={(e) => {
                    props.gender[1](e.target.checked ? e.target.value : "");
                    if (e.target.checked){
                      console.log(e.target.value)
                    }
                  }}
                />
                <label>Female</label>
              </div>
              <div></div>
            </div>
            {props.diseaseCont}
            <button className={classes.next} type="button" onClick={props.setSecond}>
              Next
            </button>
          </div>
        </>
      
  );
}

export default RegisterStep1;
