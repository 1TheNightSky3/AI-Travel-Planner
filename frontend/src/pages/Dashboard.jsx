import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard({ trips }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">YOUR TRAVEL WORKSPACE</div>
          <h1>Welcome to your Dashboard 🌍</h1>
          <p>Manage your adventures in one place.</p>
        </div>
        <Link className="btn" to="/create-trip">+ New Trip</Link>
      </div>

      <div className="feature-grid">
        <div className="card">
          <p>Total Trips</p>
          <h1>{trips.length}</h1>
        </div>
        <div className="card">
          <p>AI Travel Planner</p>
          <h2>✨ Ready</h2>
        </div>
        <div className="card">
          <p>Trip Management</p>
          <Link to="/my-trips">View My Trips →</Link>
        </div>
      </div>
    </>
  );
}