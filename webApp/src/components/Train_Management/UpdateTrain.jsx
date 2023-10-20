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

  const getTrain = async () => {
    try {
      const rest = await GET(`/Train/${id}`);
      setTrainName(rest?.data?.trainName);
    } catch (error) {
      console.log(error);
      swal(
        `${
          error?.response?.data
            ? error.response.data
            : "Train Details Loading Failed"
        }`
      );
    }
  };

  useEffect(() => {
    getTrain();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Add validation to check if trainName contains numbers
    if (/\d/.test(trainName)) {
      swal("Train Name should not contain numbers.");
      return;
    }

    try {
      if (!trainName || !trainName) {
        if (!trainName) {
          swal("Train Name is required.");
        }
        return;
      }
      const trainObj = {
        id,
        trainName,
      };
      // Assuming PUT is a function to make the API call
      const result = await PUT(`/Train/${id}`, trainObj);

      // Assuming PUT function returns the updated data
      console.log(result);
      swal("Your Train Details Succefully Updated!");
      getTrain();
      navigate("/train-details");
    } catch (error) {
      console.log(error);
      swal(
        `${
          error?.response?.data
            ? error?.response?.data
            : "Train Details Updating Failed"
        }`
      );
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

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn button-btn">
                Update Train Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
