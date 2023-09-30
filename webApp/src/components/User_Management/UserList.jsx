import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";

export default function UserList() {
    const navigate = useNavigate();
    const userList = [
        { id: 1, name: "John Doe", email: "john@example.com", active: true },
        { id: 2, name: "Jane Doe", email: "jane@example.com", active: false },
        // Add more users as needed
    ];

    const handleEdit = (id) => {
        // Implement edit logic
        console.log(`Edit user with ID ${id}`);
        navigate(`/user-update/${id}`);
    };

    const handleDelete = (id) => {
        // Implement delete logic
        console.log(`Delete user with ID ${id}`);
    };

    const handleActivate = (id) => {
        // Implement activate logic
        console.log(`Activate user with ID ${id}`);
    };

    const handleDeactivate = (id) => {
        // Implement deactivate logic
        console.log(`Deactivate user with ID ${id}`);
    };

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
                    <h1 className="display-4">User List</h1>
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
                                stroke="#FFBB38"
                            />
                        </svg>
                    </div>
                </div>
                <div className="w-75 mx-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user) => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-info mx-1"
                                            onClick={() => handleEdit(user.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger mx-1"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                        {user.active ? (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-warning mx-1"
                                                onClick={() => handleDeactivate(user.id)}
                                            >
                                                Deactivate
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-success mx-1"
                                                onClick={() => handleActivate(user.id)}
                                            >
                                                Activate
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
