import { Link } from "react-router-dom";
import React from "react";
import Layout from "../Partials/Layout";

export default function Home() {
    return (
        <Layout childrenClasses="pt-0 pb-0">
            <div className="mx-auto">
                <div style={{
                    backgroundImage: `url(${`${process.env.PUBLIC_URL}assets/images/background.jpg`})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <div style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        paddingTop: "15vh",
                        paddingBottom: "15vh",
                        paddingLeft: "10vw",
                        paddingRight: "10vw",
                    }}
                    >
                        <div>
                            <h1 className="display-1 text-center " style={{ color: "#7a25a5", fontWeight: 400 }}>Welcome to Train Reservation System</h1>
                            <p className="lead text-center" style={{ color: "#7a25a5", fontWeight: 500 }}>This is a simple web application to manage train reservations.</p>
                        </div>
                        <div className="row justify-content-center gap-5 gap-lg-0">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">User Creation</h5>
                                        <p className="card-text">View users here.</p>
                                        <Link to="/user-list" className="btn btn-primary" style={{ backgroundColor: '#7a25a5', color: 'white' }}>Go to User Creation</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Train Management</h5>
                                        <p className="card-text">Manage trains and schedules.</p>
                                        <Link to="/train-details" className="btn btn-primary" style={{ backgroundColor: '#7a25a5', color: 'white' }}>Go to Train Management</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Train Ticket Reservation</h5>
                                        <p className="card-text">Reserve train tickets here.</p>
                                        <Link to="/booking-list" className="btn btn-primary" style={{ backgroundColor: '#7a25a5', color: 'white' }}>Go to Ticket Reservation</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
