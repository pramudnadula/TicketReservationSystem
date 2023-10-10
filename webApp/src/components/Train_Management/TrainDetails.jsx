import React, { useEffect, useState } from "react";
import Layout from "../Partials/Layout";
import { Link } from "react-router-dom";
import axios from 'axios'


export default function TrainDetails() {

  const [trains, setTrains] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    async function loadTrains() {
        try {
            const response = await axios.get("https://localhost:7104/api/Train");
            setTrains(response.data);
        } catch (error) {
            console.error("Error loading train details:", error);
        }
    }
    loadTrains();
}, []);

const filterData = (searchKey) => {
  const result = trains.filter((train) =>
  train.trainName.toLowerCase().includes(searchKey) 
  );
  setFilteredPosts(result);
};

const handleSearchArea = (e) => {
  const searchKey = e.currentTarget.value;
  filterData(searchKey);
};

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
              onChange={handleSearchArea}
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
          {trains.map((train) => (
 <tr>
 <th scope="row"></th>
 <td>{train.trainName}</td>
 <td>{train.startLocation}</td>
 <td>{train.endLocation}</td>
 <td>{train.departureTime}</td>
 <td>{train.arrivalTime}</td>
 <td>
   <a className="btn btn-primary" href="mail">
     <i className="fas fa-edit"></i>&nbsp;Active
   </a>
   &nbsp; &nbsp;
   <a className="btn btn-warning" href={`/edit`}>
     <i className="fas fa-edit"></i>&nbsp;Publish
   </a>
   &nbsp;
   <button className="btn btn-danger">
     <i className="fas fa-trash-alt"></i>&nbsp;Cancel
   </button>
   &nbsp;
   <Link to={"/updateTrain/"} className="btn  btn-info">
     Update
   </Link>
 </td>
</tr>

))}
           
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
