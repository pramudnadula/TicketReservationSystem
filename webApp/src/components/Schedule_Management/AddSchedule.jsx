/* eslint-disable jsx-a11y/no-onchange */
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import Layout from "../Partials/Layout";
import MainHeaderTitle from "../Partials/MainHeaderTitle";
import { GET, POST } from "../helpers/HTTPHelper";
import InputComponent from "../helpers/InputComponent";
import places from "../Data/places.json";

export default function AddSchedule() {
  const navigate = useNavigate();

  const [trainName, setTrainName] = useState("");
  const [trainClassName, setTrainClassName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [status, setStatus] = useState("Active");
  const [trains, setTrains] = useState([]);

  const getTrains = async () => {
    try {
      const res = await GET("/Train");
      setTrains(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!trainName || !trainClassName || !startLocation || !endLocation || !departureTime || !arrivalTime || !status || !trainName) {
        if (!trainName) {
          swal('Train Name is required.');
        }
        return;
      }

      setStatus("Active");

      const schedule = {
        trainName,
        trainClassName,
        startLocation,
        endLocation,
        departureTime,
        arrivalTime,
        status,
      };

      const rest = await POST("/Schedule/create", schedule);
      console.log(rest);
      swal("Your Schedule Details Succefully Added!");
      navigate("/schedule-details");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="container-xxl my-2">
        <div className="card p-5 shadow w-50 mx-auto">
          <MainHeaderTitle
            title="Schedule Management"
            link="/schedule-details"
            buttonTitle="Train Details"
          />
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label
                htmlFor="trainName"
                className="form-label"
                style={{ color: "#7a25a5" }}
              >
                <b>Train Name</b>
              </label>
              <select
                className="form-select"
                name="trainName"
                id="trainName"
                value={trainName}
                required
                onChange={(e) => setTrainName(e.target.value)}
              >
                <option value="">Select Train Name</option>
                {trains.map((train) => (
                  <option key={train?.id} value={train?.id}>
                    {train?.trainName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor="trainClassName"
                className="form-label"
                style={{ color: "#7a25a5" }}
              >
                <b>Train Class</b>
              </label>
              <select
                className="form-select"
                name="trainClassName"
                id="trainClassName"
                value={trainClassName}
                required
                onChange={(e) => setTrainClassName(e.target.value)}
              >
                <option value="">Select Train Class</option>
                <option value="1">1 st Class</option>
                <option value="2">2 nd Class</option>
                <option value="3">3 rd Class</option>
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor="startLocation"
                className="form-label"
                style={{ color: "#7a25a5" }}
              >
                <b>Start Location</b>
              </label>
              <select
                className="form-select"
                name="startLocation"
                id="startLocation"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                required
              >
                <option value="">Select Start Location</option>
                {places.map((place) => (
                  <option key={place.id} value={place.name}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor="endLocation"
                className="form-label"
                style={{ color: "#7a25a5" }}
              >
                <b>End Location</b>
              </label>
              <select
                className="form-select"
                name="endLocation"
                id="endLocation"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                required
              >
                <option value="">Select End Location</option>
                {places.map((place) => (
                  <option key={place.id} value={place.name}>
                    {place.name}
                  </option>
                ))}
              </select>
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

              <div className="mb-3" style={{ display: "none" }}>
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
              </div>
            </div>
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
