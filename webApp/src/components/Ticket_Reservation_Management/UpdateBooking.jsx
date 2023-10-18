/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";
import { GET, PUT } from "../helpers/HTTPHelper";
import MainHeaderTitle from "../Partials/MainHeaderTitle";
import "react-datepicker/dist/react-datepicker.css";
import places from "../Data/places.json";

export default function UpdateBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [journeyDate, setJourneyDate] = useState(" ");
  const [noOfTickets, setnoOfTickets] = useState("");
  const [ticketclass, setTicketClass] = useState("");

  const getBooking = async () => {
    try {
      const rest = await GET(`Booking/${id}`);
      setFromStation(rest?.data?.fromStation);
      setToStation(rest?.data?.toStation);
      setJourneyDate(rest?.data?.journeyDate);
      setnoOfTickets(rest?.data?.noOfTickets);
      setTicketClass(rest?.data?.ticketclass);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const booking = {
        id,
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
      swal("Your Booking Details Succefully Updated!");
      navigate("/booking-list");
    } catch (error) {
      console.log(error);
      swal(`${error?.response?.data ? error?.response?.data : "Booking Failed"}`);
    }
  };

  // const handleUpdate = (e) => {
  //     e.preventDefault();
  //     console.log("Form handleUpdate");
  //     console.log(fromStation, toStation, journeyDate, noOfTickets, ticketclass);
  //     navigate("/booking-list");

  // }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="container-xxl my-2">
        <div className="card p-5 shadow w-50 mx-auto">
          <MainHeaderTitle
            title="Update Tickets"
            link="/user-list"
            buttonTitle="User List"
          />
          <form>
            <div className="mb-3">
              <label
                htmlFor="fromStation"
                className="form-label"
                style={{ color: "#7a25a5" }}
              >
                <b>From Station</b>
              </label>
              <select
                className="form-select"
                name="fromStation"
                id="fromStation"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
              >
                <option value="">Select From Station</option>
                {places.map((place) => (
                  <option key={place.id} value={place.name}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor="toStation"
                className="form-label"
                style={{ color: "#7a25a5" }}
              >
                <b>To Station</b>
              </label>
              <select
                className="form-select"
                name="toStation"
                id="toStation"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
              >
                <option value="">Select To Station</option>
                {places.map((place) => (
                  <option key={place.id} value={place.name}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <div className="mb-3">
                <label
                  htmlFor="journeyDate"
                  className="form-label"
                  style={{ color: "#7a25a5" }}
                >
                  <b>Journey Date</b>
                </label>
                <div className="input-wrapper">
                  <input
                    type="date"
                    className="form-control"
                    id="journeyDate"
                    placeholder="2023-10-18" // Set the desired format as a placeholder
                    value={new Date(journeyDate).toLocaleDateString("en-CA")} // Convert and format the date
                    onChange={(e) => setJourneyDate(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <InputComponent
                label="Number Of Tickets"
                name="noOfTickets"
                type="integer"
                placeholder="Number Of Tickets"
                inputHandler={setnoOfTickets}
                value={noOfTickets}
              />
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
                inputHandler={setTicketClass}
                onChange={(e) => setTicketClass(e.target.value)}
              >
                <option value="">Select Train Ticket Class</option>
                <option value="First Class">First Class</option>
                <option value="Second Class">Second Class</option>
                <option value="Third Class">Third Class</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn button-btn"
                style={{ backgroundColor: "navy", color: "white" }}
              >
                Update Reservation
              </button>
            </div>
            &nbsp;
          </form>
        </div>
      </div>
    </Layout>
  );
}
