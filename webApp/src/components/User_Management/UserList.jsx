import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";
import axios from 'axios'

export default function UserList() {
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadMembers() {
            try {
                const response = await axios.get("https://localhost:7104/api/User");
                setMembers(response.data);
            } catch (error) {
                console.error("Error loading members:", error);
            }
        }
        loadMembers();
    }, []);

    const handleEdit = (id) => {
        console.log(`Edit user with ID ${id}`);
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
                               
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.id}>
                                    <th scope="row">{member.username}</th>
                                    <td>{member.email}</td>
                                   
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-info mx-1"
                                            onClick={() => handleEdit(member.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger mx-1"
                                            onClick={() => handleDelete(member.id)}
                                        >
                                            Delete
                                        </button>
                                        {member.active ? (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-warning mx-1"
                                                onClick={() => handleDeactivate(member.id)}
                                            >
                                                Deactivate
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-success mx-1"
                                                onClick={() => handleActivate(member.id)}
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
