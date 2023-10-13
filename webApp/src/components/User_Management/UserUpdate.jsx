/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";
import MainHeaderTitle from "../Partials/MainHeaderTitle";
import { GET, PUT } from "../helpers/HTTPHelper";

export default function UserUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [type, setType] = useState("basic");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");
  const [nic, setNic] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const getUser = async () => {
    try {
      const rest = await GET(`User/${id}`)
      setFirstName(rest?.data?.username?.split(" ")[0])
      setLastName(rest?.data?.username?.split(" ")[1])
      setEmail(rest?.data?.email)
      setRole(rest?.data?.role)
      setActive(rest?.data?.active)
      setNic(rest?.data?.nic)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userOj = {
        username: `${firstName} ${lastName}`,
        email,
        role,
        active,
        nic
      }

      const rest = await PUT(`User/${id}`, userOj)
      console.log(rest);
      navigate("/user-list");
    } catch (error) {
      console.log(error)
    }
  };



  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const userOj = {
        oldPassword: password,
        newPassword
      }
      const rest = await PUT(`User/updatepassword/${id}`, userOj)
      console.log(rest);
      navigate("/user-list");
    } catch (error) {
      console.log(error)
    }
  }
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
            <form onSubmit={handleUpdatePassword}>
              <div className="mb-3">
                <InputComponent
                  label="Current Password"
                  name="password"
                  type="password"
                  placeholder="Current Password"
                  inputHandler={setPassword}
                />
              </div>

              <div className="mb-3">
                <InputComponent
                  label="New Password"
                  name="newPassword"
                  type="newPassword"
                  placeholder="New Password"
                  inputHandler={setNewPassword}
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
