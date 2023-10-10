/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";
import { POST } from "../helpers/HTTPHelper";
import axios from "axios";

export default function UserCreation() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = {
        username: `${firstName} ${lastName}`,
        email,
        password,
        role
      }

      const rest = await axios.post("https://localhost:7104/api/User/registration-new", user);
      console.log(rest);
      // navigate("/user-list");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="container-xxl my-2">
        <Link to="/user-list">
          <button type="button" className="btn btn-primary float-end">
            User List
          </button>
        </Link>
        <br />
      </div>
      <div className="container-xxl my-2">
        <div className="text-center mb-5">
          <h1 className="display-4">Create User</h1>
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
                label="First Name"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                inputHandler={setFirstName}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                inputHandler={setLastName}
              />
            </div>
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
            {/* user role Travel Agent and  Backoffice  */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >

                <option value="">Select Role</option>
                <option value="Travel Agent">Travel Agent</option>
                <option value="Backoffice">Backoffice</option>
              </select>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
