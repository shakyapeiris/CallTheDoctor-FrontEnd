import { ChangeEventHandler, FocusEventHandler, ReactElement, FormEventHandler } from "react";

export interface InputHookValidator {
  inputValue: string;
  hasError: boolean;
  valueChangeHandler: ChangeEventHandler<HTMLInputElement>;
  inputBlurHandler: FocusEventHandler<HTMLInputElement>;
}

export interface RegisterProps {
  name: InputHookValidator;
  age: InputHookValidator;
  address: InputHookValidator;
  number: InputHookValidator;
  gender: [type: string, setGender: (value: string) => void];
  diseaseCont: ReactElement;
  setSecond: () => void;
}

export interface RegisterAuthProps{
    password: InputHookValidator;
    email: InputHookValidator;
    message: string;
    sending: boolean;
    setSecond: () => void;
}

export interface LoginProps{
    password: InputHookValidator;
    email: InputHookValidator;
    message: string | null;
    sending: boolean;
    submit: FormEventHandler<HTMLFormElement>;
}

export interface AdminRegisterProps {
  name: InputHookValidator;
  address: InputHookValidator;
  number: InputHookValidator;
  setSecond: () => void;
}

export interface AdminHome {
  loading: boolean;
  data: {date: string; _id: string;}[];
}