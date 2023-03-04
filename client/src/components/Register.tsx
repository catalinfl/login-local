import React, { Component, ReactEventHandler, useEffect, useState } from 'react'


type RegisterType = {
  fname: string,
  lname: string,
  email: string,
  password: string
}

const Register = () => {
  
  
    const initialSignUp = {
      fname: "",
      lname: "",
      email: "",
      password: ""
    }
  
    const [signUp, setSignUp] = useState<RegisterType>(initialSignUp)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { fname, lname, email, password } = signUp
      console.log(fname, lname, email, password)
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          password
        }),
      })
      .then(() => {
        console.log("it worked")
      })
    }

    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUp({ ...signUp, fname: e.target.value })}
           />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input 
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUp({ ...signUp, lname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUp({ ...signUp, email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUp({ ...signUp, password: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }


  export default Register