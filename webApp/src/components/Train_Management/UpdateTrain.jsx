/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-onchange */
import swal from "sweetalert";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";
import InputComponent from "../helpers/InputComponent";
import MainHeaderTitle from "../Partials/MainHeaderTitle";
import { GET, PUT } from "../helpers/HTTPHelper";
import places from "../Data/places.json";

export default function UpdateTrain() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trainName, setTrainName] = useState("");
  const [trainClassName, setTrainClassName] = useState(""); // startLocation, endLocation, departureTime, arrivalTime
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [status, setStatus] = useState("");

  const getTrain = async () => {
    try {
      const rest = await GET(`Train/${id}`);
      setTrainName(rest?.data?.trainName);
      setTrainClassName(rest?.data?.trainClassName);
      setStartLocation(rest?.data?.startLocation);
      setEndLocation(rest?.data?.endLocation);
      setDepartureTime(rest?.data?.departureTime);
      setArrivalTime(rest?.data?.arrivalTime);
      setStatus(rest?.data?.status);
    } catch (error) {
      console.log(error);
      swal(`${error?.response?.data ? error.response.data : "Train Details Loading Failed"}`);
    }
  };

  useEffect(() => {
    getTrain();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      if (!trainName || !trainClassName || !startLocation || !endLocation || !departureTime || !arrivalTime || !status || !trainName) {
        if (!trainName) {
          swal('Train Name is required.');
        }
        return;
      }
      const trainObj = {
        id,
        trainName,
        trainClassName,
        startLocation,
        endLocation,
        departureTime,
        arrivalTime,
        status,
      };
      // Assuming PUT is a function to make the API call
      const result = await PUT(`Train/${id}`, trainObj);

      // Assuming PUT function returns the updated data
      console.log(result);
      swal("Your Train Details Succefully Updated!");
      getTrain();
      navigate("/train-details");
    } catch (error) {
      console.log(error);
      swal(`${error?.response?.data ? error?.response?.data : "Train Details Updating Failed"}`);
    }
  };

  return (
    <Layout childrenClasses="pt-4 pb-0 ">
      <div className="container-xxl my-2">
        <div className="card p-5 shadow w-50 mx-auto">
          <MainHeaderTitle
            title="Update Train Details"
            link="/train-details"
            buttonTitle="Train Details"
          />
          <form className="travelform" onSubmit={handleUpdate}>
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
            </div>
            <label
              htmlFor="status"
              className="form-label"
              style={{ color: "#7a25a5" }}
            >
              <b>Status</b>
            </label>
            <select
              className="form-select"
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
            <br />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn button-btn">
                Update Reservations
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
