import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";
import MainHeaderTitle from "../Partials/MainHeaderTitle";

export default function CreateBooking() {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [journeyDate, setJourneyDate] = useState(" ");
  const [noOfTickets, setnoOfTickets] = useState("");
  const [ticketclass, setTicketClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Train Reservation Form Submitted Successfully !");
    console.log(fromStation, toStation, journeyDate, noOfTickets);
    navigate("/booking-list");
  }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="container-xxl my-2">
        <div className="card p-5 shadow w-50 mx-auto">
          <MainHeaderTitle title="Train Ticket Reservation" link="/user-list" buttonTitle="User List" />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputComponent
                label="From Station"
                name="fromStation"
                type="text"
                placeholder="From Station"
                value={fromStation}
                inputHandler={setFromStation}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                label="To Station"
                name="toStation"
                type="text"
                placeholder="To Station"
                value={toStation}
                inputHandler={setToStation}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                label="Journey Date"
                name="journeyDate"
                type="date"
                placeholder="Journey Date"
                value={journeyDate}
                inputHandler={setJourneyDate}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                label="Number Of Tickets"
                name="noOfTickets"
                type="integer"
                placeholder="Number Of Tickets"
                value={noOfTickets}
                inputHandler={setnoOfTickets}
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
                onBlur={(e) => setTicketClass(e.target.value)}
              >

                <option value="">Select Train Ticket Class</option>
                <option value="First Class">First Class</option>
                <option value="Second Class">Second Class</option>
                <option value="Third Class">Third Class</option>
              </select>
            </div>
            <br />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn" style={{ backgroundColor: '#7a25a5', color: 'white' }}>
                Reserve Ticket
              </button>
            </div>
          </form>

        </div>
      </div>
    </Layout>
  );
}
