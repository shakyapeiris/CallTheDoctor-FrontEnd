import React from 'react'
import { Link } from 'react-router-dom';
import classes from './Details.module.css'

interface Props{
    name: string,
    age: Date,
    diseases: string[],
    contactNo: string,
    gender: string,
    records: {_id: string, date: Date}[],
    
}

function Details(props: Props) {
    return (
        <div className={classes.Container}>
            <div>
              <h2>Name: {props.name}</h2>
              <h2>Birthday: {new Date(props.age).toDateString()}</h2>
              <h2>Gender: {props.gender === "m" ? "Male" : "Female"}</h2>
              <h2>Disases: </h2>
              <div className="diseases-container2">
                <div className="diseases">
                  {props.diseases.map((d, index) => {
                    return (
                      <div key={index} className="disease">
                        {d}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h2>Contact Number: {props.contactNo}</h2>
            </div>
            <div className={classes.BlackContainer}>
              {props.records.length > 0 ? props.records.map((i: any) => {
                return (
                  <div key={i._id}>
                    <Link to={"records/"+i._id}><h1>{i.cause}</h1></Link>
                    <p>{i.date}</p>
                  </div>
                );
              }) : <h1>No Records</h1>}
            </div>
        </div>
    )
}

export default Details
