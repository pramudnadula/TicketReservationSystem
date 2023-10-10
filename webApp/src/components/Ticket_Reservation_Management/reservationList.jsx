import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";

export default function ReservationList() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]); // create state varible for store values

    // Implement booking get funtion api 
    useEffect(() => {
        async function loadTrains() {
            try {
                const response = await axios.get("https://localhost:7104/api/Booking");
                setBookings(response.data);
            } catch (error) {
                console.error("Error loading booking details:", error);
            }
        }
        loadTrains();
    }, []);

    const handleEdit = (id) => {
        // Implement edit logic
        console.log(`Edit booking with ID ${id}`);
        navigate(`/booking-update/${id}`);
    };

    const handleDelete = (id) => {
        // Implement delete logic
        console.log(`Delete booking with ID ${id}`);
    };

    const handleActivate = (id) => {
        // Implement activate logic
        console.log(`Activate booking with ID ${id}`);
    };

    const handleDeactivate = (id) => {
        // Implement deactivate logic
        console.log(`Deactivate booking with ID ${id}`);
    };

    return (
        <Layout childrenClasses="pt-0 pb-0">
            <div className="container-xxl my-2">
                <Link to="/create-booking">
                    <button type="button" className="btn btn-primary float-end">
                        Download
                    </button>
                </Link>
                <br />
            </div>
            <div className="container-xxl my-2">
                <div className="text-center mb-5">
                    <h1 className="text-center topic" style={{ color: "#00008b" }}>
                        Reserved Ticket List
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
                                stroke="#FFBB38"
                            />
                        </svg>
                    </div>
                </div>
                <div className="w-75 mx-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">From Station</th>
                                <th scope="col">To Station</th>
                                <th scope="col">Journey Date</th>
                                <th scope="col">No. Of Tickets</th>
                                <th scope="col">Ticket Class</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* call the usestate varible for display values */}
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.fromStation}</td>
                                    <td>{booking.toStation}</td>
                                    <td>{booking.journeyDate}</td>
                                    <td>{booking.noOfTickets}</td>
                                    <td>{booking.ticketclass}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-info mx-1"
                                            onClick={() => handleEdit(booking.id)}
                                        >
                                            Modify
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger mx-1"
                                            onClick={() => handleDelete(booking.id)}
                                        >
                                            Cancel
                                        </button>
                                        {booking.active ? (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-warning mx-1"
                                                onClick={() => handleDeactivate(booking.id)}
                                            >
                                                Deactivate
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-success mx-1"
                                                onClick={() => handleActivate(booking.id)}
                                            >
                                                Summary
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
