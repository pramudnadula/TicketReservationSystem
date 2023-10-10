import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../helpers/InputComponent";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("string");
  const [password, setPassword] = useState("string");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Submitted");
      console.log(username, password);

      const rest = await axios.post('https://localhost:7104/api/User/login',
        {
          username,
          password
        }
      )
      console.log(rest);

      navigate("/home");

    } catch (error) {
      console.log(error);
    }
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
              stroke="#D5C0ED"
            />
          </svg>
        </div>
      </div>
      <div className="w-50 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputComponent
              label="User Name"
              name="username"
              type="text"
              placeholder="Email Address"
              value={username}
              inputHandler={setUserName}
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
          </div>
        </form>
      </div>
    </div>
  );
}
