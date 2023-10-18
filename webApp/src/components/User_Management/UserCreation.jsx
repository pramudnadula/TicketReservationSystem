/* eslint-disable jsx-a11y/no-onchange */
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";
import { POST } from "../helpers/HTTPHelper";
import MainHeaderTitle from "../Partials/MainHeaderTitle";


export default function UserCreation() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // const [active, setActive] = useState(true);
  const [nic, setNic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nic === "" || firstName === "" || email === "" || password === "" || role === "") {
        swal("Please Fill All The Fields!");
        return;
      }
      const user = {
        username: `${firstName} ${lastName}`,
        email,
        password,
        role,
        active: false,
        nic
      }
      const rest = await POST('User/registration', user)
      console.log(rest);
      swal("Your User Details Succefully Added!");
      navigate("/user-list");
    } catch (error) {
      console.log(error)
      swal(`${error?.response?.data ? error?.response?.data : "Something went wrong!"}`);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("role") === "TRAVELAGENT") {
      setRole("TRAVELER");
    }
  }, [])
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="container-xxl my-2">
        <div className="card p-5 shadow w-50 mx-auto">
          <MainHeaderTitle title="User Creation" link="/user-list" buttonTitle="User List" />
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
            <div className="mb-3">
              <InputComponent
                label="NIC"
                name="nic"
                type="text"
                placeholder="NIC"
                value={nic}
                inputHandler={setNic}

              />
            </div>
            {/* user role Travel Agent and  Backoffice  */}
            {(localStorage.getItem("role") === "BACKOFFICE") && (
              <div className="mb-3">
                <label htmlFor="role" className="form-label" style={{ color: "#7a25a5" }}>
                  <b> Role </b>
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
                  <option value="TRAVELER">Traveler</option>
                </select>
              </div>
            )}
            {(localStorage.getItem("role") === "TRAVELAGENT") && (
              <div className="mb-3">
                <label htmlFor="role" className="form-label" style={{ color: "#7a25a5" }}>
                  <b> Role </b>
                </label>
                <input
                  type="text"
                  name="role"
                  value="TRAVELER"
                  className="form-control"
                  disabled
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            )}


            <br />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn" style={{ backgroundColor: '#7a25a5', color: 'white' }}>
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
