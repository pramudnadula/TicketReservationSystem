/* eslint-disable jsx-a11y/no-onchange */
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import React, { useState } from "react";
import Layout from "../Partials/Layout";
import MainHeaderTitle from "../Partials/MainHeaderTitle";
import { POST } from "../helpers/HTTPHelper";
import InputComponent from "../helpers/InputComponent";

export default function AddTrain() {
  const navigate = useNavigate();
  const [id, setID] = useState("");
  const [trainName, setTrainName] = useState("");
 

  const handleSubmit = async (e) => {
    if (!trainName) {
      if (!trainName) {
        swal("Train Name is required.");
      }
      return;
    }

    // Add validation to check if trainName contains numbers
    if (/\d/.test(trainName)) {
      swal("Train Name should not contain numbers.");
      return;
    }

    try {
      e.preventDefault();

      const train = {
        id,
        trainName,
      };

      const rest = await POST("/Train/create", train);
      console.log(rest);
      swal("Your Train Details Succefully Added!");
      navigate("/train-details");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="container-xxl my-8">
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
            <br></br>
            <br></br>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn button-btn">
                Add Train Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
