/* eslint-disable jsx-a11y/no-onchange */
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import InputComponent from "../helpers/InputComponent";
import Layout from "../Partials/Layout";
import MainHeaderTitle from "../Partials/MainHeaderTitle";
import { GET, POST } from "../helpers/HTTPHelper";
import "react-datepicker/dist/react-datepicker.css";
import places from "../Data/places.json";

export default function CreateBooking() {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [noOfTickets, setnoOfTickets] = useState("");
  const [ticketclass, setTicketClass] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [schedule, setSchedule] = useState([]);

  const fetchSchedule = async () => {
    try {
      const response = await GET("/Schedule");
      setSchedule(response.data);
    } catch (error) {
      console.error("Error loading train details:", error);
      swal(`${error?.response?.data ? error?.response?.data : "Failed to load train details"}`);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);


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
        scheduleId,
      };

      const rest = await POST("/Booking/addBooking", booking);
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
              <label
                htmlFor="trainSchedules"
                className="form-label"
                style={{ color: "#7a25a5" }}
              >
                <b>Train Schedules</b>
              </label>
              <select
                className="form-select h-100"
                name="trainSchedules"
                id="trainSchedules"
                value={scheduleId}
                onChange={(e) => setScheduleId(e.target.value)}
                style={{ height: "40px !important" }}
              >
                <option value="">Select Train Schedule</option>
                {schedule.map((sched) => (
                  <option key={sched.id} value={sched.id} style={{ height: "40px" }} >
                    {sched.train.trainName} - {sched.trainClassName} -{" "}
                    {sched.startLocation} - {sched.endLocation} -{" "}
                    {sched.arrivalTime} - {sched.departureTime}
                  </option>
                ))}
              </select>
            </div>
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


            <div className="row">
              <div className="col-md-6">
                <label
                  htmlFor="journeyDate"
                  className="form-label"
                  style={{ color: "#7a25a5" }}
                >
                  <b>Journey Date</b>
                </label>
                <DatePicker
                  selected={new Date(journeyDate)}
                  onChange={(date) => setJourneyDate(date.toISOString())}
                  filterDate={filterDates}
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                  id="journeyDate"

                />
                <div className="input-wrapper">
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
