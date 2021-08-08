import React, { ChangeEventHandler, FocusEventHandler } from "react";
import Classes from "./Input.module.css";

interface Props {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
  type: string;
}

function Input(props: Props) {
  return (
    <input
      className={Classes.val}
      type={props.type || "text"}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      onBlur={props.onBlur}
    />
  );
}

export default Input;
