import React from 'react'
import { RegisterAuthProps } from '../../../Types/interfaces';
import Input from '../../UI/Input';

import classes from './Register.module.css'


function RegisterSecond(props: RegisterAuthProps) {
    return (
        <>
            <div>
              <Input
                placeholder="Email"
                value={props.email.inputValue}
                onChange={props.email.valueChangeHandler}
                onBlur={props.email.inputBlurHandler}
                type="text"
              />
              {props.email.hasError && (
                <div className="error">Email must include @ symbol</div>
              )}
              <Input
                placeholder="Password"
                value={props.password.inputValue}
                onChange={props.password.valueChangeHandler}
                onBlur={props.password.inputBlurHandler}
                type="text"
              />
              {props.password.hasError && (
                <div className="error">
                  Length of the password must be greater than 6
                </div>
              )}
            </div>
            {props.message === "User added successfully." ? (
              <div className="success">User Added SuccessFully</div>
            ) : props.message === "Email repeated" ? (
              <div className="error">
                A user with the same email already exists
              </div>
            ) : null}

            <button
              className={classes.next}
              type="button"
              onClick={props.setSecond}
            >
              Back
            </button>
            <button className={classes.next} type="submit">
              {props.sending ? "Sending..." : "SignUp"}
            </button>
          </>
    )
}

export default RegisterSecond
