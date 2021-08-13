import React from "react";
import { AdminRegisterProps } from "../../../Types/interfaces";
import Input from "../../UI/Input";

function RegisterStep1(props: AdminRegisterProps) {
  return (
    <div>
      <Input
        placeholder="Branch Name"
        value={props.name.inputValue}
        onChange={props.name.valueChangeHandler}
        onBlur={props.name.inputBlurHandler}
        type="text"
      />
      {props.name.hasError && <div className="error">Enter a valid name</div>}

      <Input
        placeholder="Address"
        value={props.address.inputValue}
        onChange={props.address.valueChangeHandler}
        onBlur={props.address.inputBlurHandler}
        type="text"
      />
      {props.address.hasError && <div className="error">Enter a valid Address</div>}
      <Input
        placeholder="Contact Number"
        value={props.number.inputValue}
        onChange={props.number.valueChangeHandler}
        onBlur={props.number.inputBlurHandler}
        type="number"
      />
      {props.number.hasError && <div className="error">Enter a valid Number</div>}
      <button className="next" type="button" onClick={props.setSecond}>
        Next
      </button>
    </div>
  );
}

export default RegisterStep1;
