import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";
import { GET, DELETE, PUT } from "../helpers/HTTPHelper";

export default function UserList() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");

  const fetchMembers = async () => {
    try {
      const response = await GET("User");
      setMembers(response.data);
    } catch (error) {
      console.error("Error loading members:", error);
      swal(`${error?.response?.data ? error.response.data : "Failed to load members"}`);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Implement edit logic pass id to edit page
  const handleEdit = (id) => {
    console.log(id);
    navigate(`/user-update/${id}`);
  };

  // implement delete function in here
  const onDelete = async (id) => {
    try {
      if (localStorage.getItem("role") === "TRAVELAGENT") {
        swal("You are not allowed to delete this user");
        return;
      }
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (willDelete) {
        const res = await DELETE(`/User/${id}`);
        console.log(res);
        swal(`${res?.data?.message ? res?.data?.message : "Delete Failed"}`);
        fetchMembers();
      }
    } catch (error) {
      console.error(error);
      swal(`${error?.response?.data ? error?.response?.data : "Delete Failed"}`);
    }
  };

  const handleActivation = async (user) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deactivated, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (!willDelete) {
        return;
      }
      const updatedUser = { ...user };
      if (updatedUser.active === true) {
        updatedUser.active = false;
      } else {
        updatedUser.active = true;
      }

      const res = await PUT(`/User/active/${updatedUser.nic}?active=${updatedUser.active}`);
      console.log(res);
      swal(`${res?.data ? res?.data : "Deactivate Failed"}`);
      fetchMembers();

    } catch (error) {
      console.error(error);
      swal(`${error?.response?.data ? error?.response?.data : "Deactivate Failed"}`);
    }

  };
  // search function start here
  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  const filteredUsers = members?.filter(
    (user) =>
      user?.username.toLowerCase().includes(searchKey.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchKey.toLowerCase()) ||
      user?.nic.toLowerCase().includes(searchKey.toLowerCase()) ||
      user?.role.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="container-xxl my-2">
        <Link to="/user-creation">
          <button type="button" className="btn btn-primary float-end">
            Create User
          </button>
        </Link>
        <br />
      </div>
      <div className="container-xxl my-2">
        <div className="text-center mb-5">
          <h1 className="text-center topic" style={{ color: "#00008b" }}>
            <b>User Details</b>
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
        <div className="w-100 mx-auto overflow-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">NIC</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col" colSpan={
                  localStorage.getItem("role") === "BACKOFFICE" ? "3" : "2"
                } style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((member) => (
                <tr key={member.id}>
                  <th scope="row">{member.username.split("undefined")[0]}</th>
                  <td>{member.email}</td>
                  <td>{member.nic}</td>
                  <td>{member.role}</td>
                  <td>{member.active ? "Active" : "Inactive"}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-info mx-1"
                      style={{ width: "90px" }}
                      onClick={() => handleEdit(member.nic)}
                    >
                      Edit
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger mx-1"
                      style={{ width: "90px" }}
                      onClick={() => onDelete(member.id)}
                    >
                      Delete
                    </button>
                  </td>
                  {localStorage.getItem("role") === "BACKOFFICE" && (
                    <td>
                      {member.active ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-warning mx-1"
                          style={{ width: "90px" }}
                          onClick={() => handleActivation(member)}
                          disabled={localStorage.getItem("role") !== "BACKOFFICE"}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-success mx-1"
                          style={{ width: "90px" }}
                          onClick={() => handleActivation(member)}
                          disabled={localStorage.getItem("role") !== "BACKOFFICE"}
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
