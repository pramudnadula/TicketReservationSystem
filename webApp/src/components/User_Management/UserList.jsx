import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";
import { GET, DELETE } from "../helpers/HTTPHelper";

export default function UserList() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    async function loadMembers() {
      try {
        const response = await GET("User");
        setMembers(response.data);
      } catch (error) {
        console.error("Error loading members:", error);
      }
    }
    loadMembers();
  }, []);

  // implement delete function here
  const onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        DELETE(`/User/${id}`).then((res) => {
          swal("Deleted Successfully", "User Details Are Removed", "success");
          window.location.reload();
        });
      } else {
        swal("Your user details are safe!");
      }
    });
  };

  const handleEdit = (id) => {
    // console.log(`Edit user with ID ${id}`);
    console.log(id);
    navigate(`/user-update/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID ${id}`);
    // Implement delete logic here
  };

  const handleActivate = (id) => {
    console.log(`Activate user with ID ${id}`);
    // Implement activate logic here
  };

  const handleDeactivate = (id) => {
    console.log(`Deactivate user with ID ${id}`);
    // Implement deactivate logic here
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
                          onClick={() => handleDeactivate(member.id)}
                          disabled={localStorage.getItem("role") !== "BACKOFFICE"}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-success mx-1"
                          style={{ width: "90px" }}
                          onClick={() => handleActivate(member.id)}
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
