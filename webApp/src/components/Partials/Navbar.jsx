import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <div className="container">
        <Link className="navbar-brand" to="/">
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button type="button" onClick={signOut} className="nav-link btn btn-link text-dark font-weight-bold">
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
