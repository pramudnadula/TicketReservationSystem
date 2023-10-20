import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";
import { DELETE, GET } from "../helpers/HTTPHelper";



export default function TrainDetails() {
  const [trains, setTrains] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const fetchTrains = async () => {
    try {
      const response = await GET("/Train");
      setTrains(response.data);
    } catch (error) {
      console.error("Error loading train details:", error);
      swal(`${error?.response?.data ? error?.response?.data : "Failed to load train details"}`);
    }
  }

  useEffect(() => {
    fetchTrains();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit train with ID ${id}`);
    navigate(`/update-train/${id}`);
  };

  const onDelete = async (id) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (willDelete) {
        const res = await DELETE(`/Train/${id}`);
        console.log(res);
        swal("Deleted Successfully", "Train Details Are Removed", "success");
        fetchTrains();
      }
    } catch (error) {
      console.error(error);
      swal(`${error?.response?.data ? error?.response?.data : "Delete Failed"}`);
    }
  };


  // search function start here
  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  const filteredTrains = trains.filter(
    (train) =>
      train.trainName.toLowerCase().includes(searchKey.toLowerCase()) 
      
  );

  return (
    <Layout childrenClasses="pt-4 pb-0 ">
      <div className="container mt-12">
        <div className="container-xxl my-2">
          <Link to="/create-train">
            <button type="button" className="btn btn-primary float-end">
              Add Train
            </button>
          </Link>
          <br />
        </div>
        <div className="text-center mb-5">
          <h1 className="text-center topic" style={{ color: "#00008b" }}>
            <b>Train Details</b>
          </h1>
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
        </div>
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

        <table className="table shadow mb-10 ">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Trin ID</th>
              <th scope="col">Train Name</th>
             
              
              
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrains.map((train) => (
              <tr>
                <th scope="row"></th>
                <td>{train.id}</td>
                <td>{train.trainName}</td>
               
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-info mx-1"
                    onClick={() => handleEdit(train.id)}
                  >
                    View & Update
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn-sm btn-danger"
                    onClick={() => onDelete(train.id)}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp;Cancel
                  </button>
                  &nbsp;

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
