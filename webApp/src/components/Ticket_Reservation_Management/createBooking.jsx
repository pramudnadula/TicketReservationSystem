import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";

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
        <Link to="/booking-list">
          <button type="button" className="btn btn-primary float-end">
            Booking List
          </button>
        </Link>
        <br />
      </div>

      <div className="container-xxl my-2">
        <div className="text-center mb-5">
          <br></br>
          <h1
            className="text-center topic"
            style={{ color: "#00008b" }}
          >
            Train Ticket Reservation Form
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
        <form
          className="needs-validation"
          align="center"
          style={{
            marginLeft: "310px",
            width: "50%",
            borderLeftWidth: "7px",
            borderRightWidth: "7px",
            borderStyle: "solid",
            borderWidth: "6px",
            boxShadow: "0 8px 350px 0 rgba(0, 0, 0, 0.5)",
            alignContent: "center",
            borderColor: "navy",
          }}
          noValidate
        >&nbsp;
          <div className="w-50 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="ticketclass" className="form-label">
                  <b>From Station</b> </label>
                <InputComponent
                  label=""
                  name="fromStation"
                  type="text"
                  placeholder="From Station"
                  value={fromStation}
                  inputHandler={setFromStation}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ticketclass" className="form-label">
                  <b>To Station</b> </label>
                <InputComponent
                  label=""
                  name="toStation"
                  type="text"
                  placeholder="To Station"
                  value={toStation}
                  inputHandler={setToStation}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ticketclass" className="form-label">
                  <b>Journey Date</b> </label>
                <InputComponent
                  label=""
                  name="journeyDate"
                  type="date"
                  placeholder="Journey Date"
                  value={journeyDate}
                  inputHandler={setJourneyDate}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ticketclass" className="form-label">
                  <b>Number Of Tickets</b>
                </label>
                <InputComponent
                  label=""
                  name="noOfTickets"
                  type="integer"
                  placeholder="Number Of Tickets"
                  value={noOfTickets}
                  inputHandler={setnoOfTickets}
                />
              </div>
              {/* Train Ticket Classes */}
              <div className="mb-3">
                <label htmlFor="ticketclass" className="form-label">
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
              &nbsp;&nbsp;
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn" style={{ backgroundColor: 'navy', color: 'white' }}>
                  Reserve Ticket
                </button>
              </div>&nbsp;
            </form>
          </div>
        </form>
      </div>
    </Layout>
  );
}
