import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../../helpers/InputComponent";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    console.log(email, password);
    navigate("/home");

  }

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Log In</h1>
        <div className="shape">
          <svg
            width="172"
            height="29"
            viewBox="0 0 172 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
              stroke="#FFBB38"
            />
          </svg>
        </div>
      </div>
      <div className="w-50 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputComponent
              label="Email Address"
              name="email"
              type="email"
              placeholder="Email Address"
              value={email}
              inputHandler={setEmail}
            />
          </div>
          <div className="mb-3">
            <InputComponent
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              inputHandler={setPassword}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
            <Link className="btn btn-link" to="/signup">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
