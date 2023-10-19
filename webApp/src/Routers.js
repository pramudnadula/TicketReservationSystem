import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/index";
import UserCreation from "./components/User_Management/UserCreation";
import Home from "./components/Home";
import UserList from "./components/User_Management/UserList";
import UserUpdate from "./components/User_Management/UserUpdate";
import AddSchedule from "./components/Schedule_Management/AddSchedule";
import ScheduleDetails from "./components/Schedule_Management/ScheduleDetails";
import UpdateSchedule from "./components/Schedule_Management/UpdateSchedule";
import ReservationList from "./components/Ticket_Reservation_Management/ReservationList";
import CreateBooking from "./components/Ticket_Reservation_Management/CreateBooking";
import UpdateBooking from "./components/Ticket_Reservation_Management/UpdateBooking";


export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={localStorage.getItem("AccessToken") ? <Home /> : <Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<Login />} />

      {/* User Management */}
      <Route exact path="/user-creation" element={<UserCreation />} />
      <Route exact path="/user-list" element={<UserList />} />
      <Route exact path="/user-update/:id" element={<UserUpdate />} />

      {/* Train Management */}
      <Route exact path="/create-schedule" element={localStorage.getItem("role") === "BACKOFFICE" ? <AddSchedule /> : <Home />} />
      <Route exact path="/schedule-details" element={localStorage.getItem("role") === "BACKOFFICE" ? <ScheduleDetails /> : <Home />} />
      <Route path="/update-schedule/:id" element={localStorage.getItem("role") === "BACKOFFICE" ? <UpdateSchedule /> : <Home />} />

      {/* Ticket Reservation Management */}
      <Route exact path="/create-booking" element={<CreateBooking />} />
      <Route exact path="/booking-list" element={<ReservationList />} />
      <Route exact path="/update-booking/:id" element={<UpdateBooking />} />
    </Routes>


  );
}
