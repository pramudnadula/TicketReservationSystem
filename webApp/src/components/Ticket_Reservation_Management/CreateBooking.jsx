/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";
import MainHeaderTitle from "../Partials/MainHeaderTitle";
import { POST } from "../helpers/HTTPHelper";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateBooking() {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [noOfTickets, setnoOfTickets] = useState("");
  const [ticketclass, setTicketClass] = useState("");
  console.log(journeyDate);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const booking = {
        nic: localStorage.getItem("userID"),
        fromStation,
        toStation,
        journeyDate,
        noOfTickets,
        ticketclass,
      };

      const rest = await POST("Booking/addBooking", booking);
      console.log(rest);
      swal("Your Booking Details Succefully Added!");
      navigate("/booking-list");
    } catch (error) {
      console.log(error);
      swal(`${error?.response?.data ? error.response.data : "Booking Failed"}`);
    }
  };

  // Function to filter dates to current month
  const filterDates = (date) => {
    const today = new Date();
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <br></br>
      <br></br>
      <div className="container-xxl my-2 mb-5 ">
        <div className="card p-5 shadow w-50 mx-auto mb-14">
          <MainHeaderTitle
            title="Train Ticket Reservation"
            link="/user-list"
            buttonTitle="User List"
          />
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

            <div className="row">
              <div className="col-md-6">
                <label
                  htmlFor="journeyDate"
                  className="form-label"
                  style={{ color: "#7a25a5" }}
                >
                  <b>Journey Date</b>
                </label>
                <div className="input-wrapper ">
                  <DatePicker
                    selected={new Date(journeyDate)}
                    onChange={(date) => setJourneyDate(date.toISOString())}
                    filterDate={filterDates}
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                    id="journeyDate"
                    style={{ width: "800%" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <InputComponent
                  label="Number Of Tickets"
                  name="noOfTickets"
                  type="integer"
                  placeholder="Number Of Tickets"
                  value={noOfTickets}
                  inputHandler={setnoOfTickets}
                />
              </div>
            </div>
            {/* Train Ticket Classes */}
            <div className="mb-3">
              <label
                htmlFor="ticketclass"
                className="form-label"
                style={{ color: "#7a25a5" }}
              >
                <b>Train Ticket Classes</b>
              </label>
              <select
                className="form-select"
                name="ticketclass"
                id="ticketclass"
                value={ticketclass}
                onChange={(e) => setTicketClass(e.target.value)}
              >
                <option value="">Select Train Ticket Class</option>
                <option value="First Class">First Class</option>
                <option value="Second Class">Second Class</option>
                <option value="Third Class">Third Class</option>
              </select>
            </div>
            <br />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn button-btn">
                Reserve Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
