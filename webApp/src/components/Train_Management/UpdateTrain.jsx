import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";
import { Link } from "react-router-dom";

export default function UpdateTrain() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trainS, setTrainS] = useState("");
  const [trainName, setTrainName] = useState("");
  const [trainClassName, setTrainClassName] = useState(""); // startLocation, endLocation, departureTime, arrivalTime
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  useEffect(() => {
    fetch(`https://localhost:7104/api/Train/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTrainName(data.trainName);
        setTrainClassName(data.trainClassName);
        setStartLocation(data.startLocation);
        setEndLocation(data.endLocation);
        setDepartureTime(data.departureTime);
        setArrivalTime(data.arrivalTime);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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
                <label>Train Name </label> <br />
                <input
                  type="text"
                  className="form-control"
                  value={trainClassName}
                  onChange={(event) => setTrainClassName(event.target.value)}
                />
                <label>Train Class Name </label>
                <br />
                <select
                  className="form-control"
                  value={trainClassName}
                  onChange={(event) => setTrainName(event.target.value)}
                >
                  <option value="option1">1 st Class</option>
                  <option value="option2">2 nd Class</option>
                  <option value="option3">3 rd Class</option>
                </select>
              </div>
              <label>Start Location </label> <br />
              <input
                type="text"
                className="form-control"
                value={startLocation}
                onChange={(event) => setStartLocation(event.target.value)}
              />
              <br />
              <label>End Location </label> <br />
              <input
                type="text"
                className="form-control"
                value={endLocation}
                onChange={(event) => setEndLocation(event.target.value)}
              />{" "}
              <br />
              <div className="row">
                <div className="col-md-6">
                  <label>Departure Time</label>
                  <input
                    value={departureTime}
                    onChange={(event) => setDepartureTime(event.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Arrival Time</label>
                  <input
                    name="arrivalTime"
                    className="form-control"
                    value={arrivalTime}
                    onChange={(event) => setArrivalTime(event.target.value)}
                    required
                  />
                </div>
              </div>
              <br />
              <div className="form-group">
                <Link to={"/train-details/"} className="btn btn-primary">
                  Update Reservations
                </Link>
              </div>
            </form>
          </center>
        </div>
      </div>
    </Layout>
  );
}
