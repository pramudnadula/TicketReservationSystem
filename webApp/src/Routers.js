import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/index";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";


export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
  );
}
