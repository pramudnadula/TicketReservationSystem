/* eslint-disable jsx-a11y/no-onchange */
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Layout from "../Partials/Layout";
import MainHeaderTitle from "../Partials/MainHeaderTitle";
import { POST } from "../helpers/HTTPHelper";
import InputComponent from "../helpers/InputComponent";
import swal from "sweetalert";

export default function AddTrain() {
  const navigate = useNavigate();

  const [trainName, setTrainName] = useState("");
  const [trainClassName, setTrainClassName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [status, setStatus] = useState("Deactive");
  const [showStatusField, setShowStatusField] = useState(false);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setStatus("Deactive");

      const train = {
        trainName,
        trainClassName,
        startLocation,
        endLocation,
        departureTime,
        arrivalTime,
        status,
      };

      const rest = await POST("Train/create", train);
      console.log(rest);
      swal("Your Train Details Succefully Added!");
      navigate("/train-details");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="container-xxl my-2">
        <div className="card p-5 shadow w-50 mx-auto">
          <MainHeaderTitle
            title="Train Management"
            link="/train-details"
            buttonTitle="Train Details"
          />
          <form onSubmit={handleSubmit}>

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

              <div className="mb-3">
                {showStatusField && (
                  <>
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
                  </>
                )}
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
