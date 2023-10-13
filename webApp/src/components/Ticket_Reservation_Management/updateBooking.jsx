import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";
import { PUT } from "../helpers/HTTPHelper";
import MainHeaderTitle from "../Partials/MainHeaderTitle";

export default function UpdateBooking() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const [fromStation, setFromStation] = useState("");
    const [toStation, setToStation] = useState("");
    const [journeyDate, setJourneyDate] = useState(" ");
    const [noOfTickets, setnoOfTickets] = useState("");
    const [ticketclass, setTicketClass] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const booking = {
                fromStation,
                toStation,
                journeyDate,
                noOfTickets,
                ticketclass,
            };

            // Assuming you have an `id` for the booking you want to update


            // Use the PUT function to update the booking
            const updatedBooking = await PUT(`Booking/${id}`, booking);

            console.log(updatedBooking);
            navigate("/booking-list");
        } catch (error) {
            console.log(error);
        }
    }


    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Form handleUpdate");
        console.log(fromStation, toStation, journeyDate, noOfTickets, ticketclass);
        navigate("/booking-list");

    }


    return (
        <Layout childrenClasses="pt-0 pb-0">
            <div className="container-xxl my-2">
                <div className="card p-5 shadow w-50 mx-auto">
                    <MainHeaderTitle title="Update Tickets" link="/user-list" buttonTitle="User List" />
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <InputComponent
                                label="From Station"
                                name="fromStation"
                                type="text"
                                placeholder="From Station"

                                value={fromStation}
                            />
                        </div>
                        <div className="mb-3">
                            <InputComponent
                                label="To Station"
                                name="toStation"
                                type="text"
                                placeholder="To Station"
                                value={toStation}
                            />
                        </div>
                        <div className="mb-3">
                            <InputComponent
                                label="Journey Date"
                                name="journeyDate"
                                type="date"
                                placeholder="Journey Date"

                                value={journeyDate}
                            />
                        </div>
                        <div className="mb-3">
                            <InputComponent
                                label="Number Of Tickets"
                                name="noOfTickets"
                                type="integer"
                                placeholder="Number Of Tickets"

                                value={noOfTickets}
                            />
                        </div>
                        {/* Train Ticket Classes */}
                        <div className="mb-3">
                            <label htmlFor="ticketclass" className="form-label" style={{ color: "#7a25a5" }}>
                                <b>Train Ticket Classes</b>
                            </label>
                            <select
                                className="form-select"
                                name="ticketclass"
                                id="ticketclass"
                                value={ticketclass}

                            >
                                <option value="">Select Train Ticket Class</option>
                                <option value="First Class">First Class</option>
                                <option value="Second Class">Second Class</option>
                                <option value="Third Class">Third Class</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" onClick={handleSubmit} className="btn button-btn" style={{ backgroundColor: 'navy', color: 'white' }}>
                                Update Reservation
                            </button>
                        </div>&nbsp;
                    </form>
                </div>

            </div>
        </Layout>
    );
}
