import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/index";
import UserCreation from "./components/User_Management/UserCreation";
import Home from "./components/Home";
import UserList from "./components/User_Management/UserList";
import UserUpdate from "./components/User_Management/UserUpdate";
import AddTrain from "./components/Train_Management/AddTrain";
import TrainDetails from "./components/Train_Management/TrainDetails";
import UpdateTrain from "./components/Train_Management/UpdateTrain";
import createBooking from "./components/Ticket_Reservation_Management/createBooking";
import reservationList from "./components/Ticket_Reservation_Management/reservationList";
import updateBooking from "./components/Ticket_Reservation_Management/updateBooking";

export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/user-creation" element={<UserCreation />} />
      <Route exact path="/user-list" element={<UserList />} />
      <Route exact path="/user-update/:id" element={<UserUpdate />} />

    {/* Train management */}
      <Route exact path="/createTrain" element={<AddTrain />} />
      <Route exact path="/trainDetails" element={<TrainDetails />} />
      <Route exact path="/updateTrain" element={<UpdateTrain />} />

     {/* Ticket Reservation Management */} 
      <Route exact path="/create-booking" element={<createBooking />} />
      <Route exact path="/booking-list" element={<reservationList />} />
      <Route exact path="/update-booking" element={<updateBooking />} />
    </Routes>

    
  );
}
