import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/index";
import UserCreation from "./components/User_Management/UserCreation";
import Home from "./components/Home";
import UserList from "./components/User_Management/UserList";
import UserUpdate from "./components/User_Management/UserUpdate";


export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/user-creation" element={<UserCreation />} />
      <Route exact path="/user-list" element={<UserList />} />
      <Route exact path="/user-update/:id" element={<UserUpdate />} />
    </Routes>
  );
}
