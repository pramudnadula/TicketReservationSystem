import React from "react";
import Layout from "../Partials/Layout";
import { Link } from "react-router-dom";

export default function AddTrain() {
  return (
    <Layout childrenClasses="pt-4 pb-0 ">
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="card p-5 shadow ">
          <center>
            <h1 className="topic">
              <b>Train Management</b>
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
            </h1>
          </center>
          <center>
            <form className="travelform">
              <div className="form-group ">
                <br></br>
                <label>Train Name </label>
                <br />

                <select className="form-control">
                  <option value="option1">1 st Class</option>
                  <option value="option2">2 nd Class</option>
                  <option value="option3">3 rd Class</option>
                </select>
              </div>
              <label>Start Location </label> <br />
              <input type="text" className="form-control" />
              <br />
              <label>End Location </label> <br />
              <input type="text" className="form-control" /> <br />
              <div className="row">
                <div className="col-md-6">
                  <label>Departure Time</label>
                  <input
                    type="time"
                    name="departureTime"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Arrival Time</label>
                  <input
                    type="time"
                    name="arrivalTime"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <br />
              <div className="form-group">
                <Link to={"/train-details/"} className="btn btn-primary">
                  Add Reservations
                </Link>
              </div>
            </form>
          </center>
        </div>
      </div>
    </Layout>
  );
}
