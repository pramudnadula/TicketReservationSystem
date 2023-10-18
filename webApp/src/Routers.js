import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/index";
import UserCreation from "./components/User_Management/UserCreation";
import Home from "./components/Home";
import UserList from "./components/User_Management/UserList";
import UserUpdate from "./components/User_Management/UserUpdate";
import AddTrain from "./components/Train_Management/AddTrain";
import TrainDetails from "./components/Train_Management/TrainDetails";
import UpdateTrain from "./components/Train_Management/UpdateTrain";
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
      <Route exact path="/create-train" element={localStorage.getItem("role") === "BACKOFFICE" ? <AddTrain /> : <Home />} />
      <Route exact path="/train-details" element={localStorage.getItem("role") === "BACKOFFICE" ? <TrainDetails /> : <Home />} />
      <Route path="/updateTrain/:id" element={localStorage.getItem("role") === "BACKOFFICE" ? <UpdateTrain /> : <Home />} />

      {/* Ticket Reservation Management */}
      <Route exact path="/create-booking" element={<CreateBooking />} />
      <Route exact path="/booking-list" element={<ReservationList />} />
      <Route exact path="/update-booking/:id" element={<UpdateBooking />} />
    </Routes>


  );
}
