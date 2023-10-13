/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";
import { Link } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import MainHeaderTitle from "../Partials/MainHeaderTitle";

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
      <div className="container-xxl my-2">
        <div className="card p-5 shadow w-50 mx-auto">
          <MainHeaderTitle
            title="Update Train Details"
            link="/train-details"
            buttonTitle="Train Details"
          />
          <form className="travelform">
            <div className="mb-3">
              <InputComponent
                label="Train Name"
                name="trainName"
                type="text"
                placeholder="Train Name"
                value={trainName}
                required
                inputHandler={setTrainName}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="trainName"
                className="form-label"
                style={{ color: "#7a25a5" }}
              >
                <b>Train Class Name</b>
              </label>
              <select
                className="form-select"
                name="trainClassName"
                id="trainClassName"
                value={trainClassName}
                required
                onChange={(e) => setTrainClassName(e.target.value)}
              >
                <option value="">Select Train Name</option>
                <option value="1">1 st Class</option>
                <option value="2">2 nd Class</option>
                <option value="3">3 rd Class</option>
              </select>
            </div>
            <div className="mb-3">
              <InputComponent
                label="Start Location"
                name="startLocation"
                type="text"
                placeholder="Start Location"
                value={startLocation}
                required
                inputHandler={setStartLocation}
              />
            </div>

            <div className="mb-3">
              <InputComponent
                label="End Location"
                name="endLocation"
                type="text"
                placeholder="End Location"
                value={endLocation}
                required
                inputHandler={setEndLocation}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <InputComponent
                  label="Departure Time"
                  name="departureTime"
                  type="text"
                  placeholder="Departure Time"
                  value={departureTime}
                  required
                  inputHandler={setDepartureTime}
                />
              </div>
              <div className="col-md-6">
                <InputComponent
                  label="Arrival Time"
                  name="arrivalTime"
                  type="text"
                  placeholder="Arrival Time"
                  value={arrivalTime}
                  required
                  inputHandler={setArrivalTime}
                />
              </div>
            </div>
            <label
              htmlFor="trainName"
              className="form-label"
              style={{ color: "#7a25a5" }}
            >
              <b>Status</b>
            </label>
            <select
              className="form-select"
              name="trainClassName"
              id="trainClassName"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Train Status</option>
              <option value="option2">Active</option>
              <option value="option2">Deactive</option>

            </select>
            <br />
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn button-btn"
              >
                Add Reservations
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
