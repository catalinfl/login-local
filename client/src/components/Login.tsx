import React, { useState } from 'react'

type LoginType = {
  email: string,
  password: string
}

  const Login: React.FC = () => {
    
    const initialLogin: LoginType = { 
      email: "",
      password: ""
    }

    const [login, setLogin] = useState<LoginType>(initialLogin);


    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { email, password } = login;
      console.log(email, password)
      fetch("http://localhost:5000/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          email,
          password
        })
      })
    }

    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin({ ...login, email: e.target.value } )}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin({ ...login, password: e.target.value } )}
/>
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
}

export default Login