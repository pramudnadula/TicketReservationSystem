import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";
import { DELETE, GET } from "../helpers/HTTPHelper";
import swal from "sweetalert";

export default function TrainDetails() {
  const [trains, setTrains] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTrains() {
      try {
        const response = await GET("Train");
        setTrains(response.data);
      } catch (error) {
        console.error("Error loading train details:", error);
      }
    }
    loadTrains();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit train with ID ${id}`);
    navigate(`/updateTrain/${id}`);
  };

  const onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        DELETE(`/Train/${id}`).then((res) => {
          swal("Deleted Successfully", "Train Details Are Removed", "success");
          window.location.reload();
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //search function start here
  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  const filteredTrains = trains.filter(
    (train) =>
      train.trainName.toLowerCase().includes(searchKey.toLowerCase()) ||
      train.startLocation.toLowerCase().includes(searchKey.toLowerCase()) ||
      train.endLocation.toLowerCase().includes(searchKey.toLowerCase()) ||
      train.departureTime.toLowerCase().includes(searchKey.toLowerCase()) ||
      train.arrivalTime.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <Layout childrenClasses="pt-4 pb-0 ">
      <div className="container mt-12">
        <div className="row">
          <div className="col-lg-9 mt-12 mb-2">
            <h4>Search Train details</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search by Train Name"
              onChange={handleSearch}
            />
          </div>
        </div>

        <table className="table shadow mb-10">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Train Name</th>
              <th scope="col">Start Location</th>
              <th scope="col">End Location</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrains.map((train) => (
              <tr>
                <th scope="row"></th>
                <td>{train.trainName}</td>
                <td>{train.startLocation}</td>
                <td>{train.endLocation}</td>
                <td>{train.departureTime}</td>
                <td>{train.arrivalTime}</td>
                <td>
                  {train.active ? (
                    <button
                      type="button"
                      className="btn btn btn-warning mx-1"
                      onClick={() => onDeactivate(train.id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn btn-success mx-1"
                      onClick={() => onActivate(train.id)}
                    >
                      Activate
                    </button>
                  )}
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <a className="btn btn-warning">
                    <i className="fas fa-edit"></i>&nbsp;Publish
                  </a>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(train.id)}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp;Cancel
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn btn-info mx-1"
                    onClick={() => handleEdit(train.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
