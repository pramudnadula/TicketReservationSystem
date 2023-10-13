import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";
import MainHeaderTitle from "../Partials/MainHeaderTitle";

export default function UserUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [type, setType] = useState("basic");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Form handleUpdate");
    console.log(firstName, lastName, email, password, role);
    navigate("/user-list");
  };


  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="container-xxl my-2">

        <div className="card p-5 shadow w-50 mx-auto">
          <MainHeaderTitle title="User Update" link="/user-list" buttonTitle="User List" />

          <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
            <button
              type="button"
              className={`btn btn-sm button-btn-outline ${type === "basic" ? "button-btn-active" : ""
                }`}
              onClick={() => setType("basic")}
            >
              Basic
            </button>
            <button
              type="button"
              className={`btn btn-sm button-btn-outline ${type === "password" ? "button-btn-active" : ""
                }`}
              onClick={() => setType("password")}
            >
              Password
            </button>
          </div>
          {type === "basic" && (
            <form onSubmit={handleUpdate}>
              {/* First Form Section */}
              <div className="mb-3">
                <InputComponent
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  // value={firstName}
                  inputHandler={setFirstName}
                />
              </div>
              <div className="mb-3">
                <InputComponent
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  // value={lastName}
                  inputHandler={setLastName}
                />
              </div>
              <div className="mb-3">
                <InputComponent
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  // value={email}
                  inputHandler={setEmail}
                />
              </div>
              <div className="mb-3">
                <InputComponent
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  // value={password}
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
                  // value={role}
                  onBlur={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="TRAVELAGENT">Travel Agent</option>
                  <option value="BACKOFFICE">Backoffice</option>
                </select>
              </div>

              <br />
              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn button-btn">
                  Update User
                </button>
              </div>
            </form>
          )}
          {type === "password" && (
            <form>
              <div className="mb-3">
                <InputComponent
                  label="Current Password"
                  name="password"
                  type="password"
                  placeholder="Current Password"
                  // value={firstName}
                  inputHandler={password}
                />
              </div>

              <div className="mb-3">
                <InputComponent
                  label="New Password"
                  name="newPassword"
                  type="newPassword"
                  placeholder="New Password"
                  // value={firstName}
                  inputHandler={newPassword}
                />
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn button-btn-outline">
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
