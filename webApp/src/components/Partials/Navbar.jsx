import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const signOut = () => {
    localStorage.clear();
    navigate("/login");
  }

  // Define a function to check if a given path matches the current location
  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-color shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img
            src={`${process.env.PUBLIC_URL}/android-chrome-512x512.png`}
            width="36"
            height="36"
            alt="country logo"
            className="overflow-hidden rounded-full mr-2"
          />
          Ticket Reservation System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto ">
            <Link className="nav-link" to="/user-creation">
              <li className={`nav-item ${isActive("/user-creation") ? "active link-color font-weight-bold" : ""}`}>
                User Creation
              </li>
            </Link>
            {localStorage.getItem("role") === "BACKOFFICE" && (
              <Link className="nav-link" to="/create-schedule">
                <li className={`nav-item ${isActive("/create-schedule") ? "active link-color font-weight-bold" : ""}`}>
                  Schedule Creation
                </li>
              </Link>
            )}
             {localStorage.getItem("role") === "BACKOFFICE" && (
              <Link className="nav-link" to="/create-train">
                <li className={`nav-item ${isActive("/create-train") ? "active link-color font-weight-bold" : ""}`}>
                  Train Creation
                </li>
              </Link>
            )}
            <Link className="nav-link" to="/create-booking">
              <li className={`nav-item ${isActive("/create-booking") ? "active link-color font-weight-bold" : ""}`}>
                Ticket Reservation
              </li>
            </Link>

            <li className="nav-item">
              <button type="button" onClick={signOut} className="nav-link btn btn-link">
                Sign Out
              </button>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}
