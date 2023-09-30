import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/index";
import Signup from "./components/Auth/Signup";


export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
  );
}
