import React from "react";
import { Link } from "react-router-dom";

export default function MyTrips({ trips }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">YOUR ADVENTURES</div>
          <h1>My Trips 🧳</h1>
          <p>All your saved travel plans.</p>
        </div>
        <Link className="btn" to="/create-trip">+ Create Trip</Link>
      </div>

      {trips.length === 0 ? (
        <div className="card empty-state">
          <h2>No trips yet!</h2>
          <p>Start planning your first adventure.</p>
          <Link className="btn" to="/create-trip">Create a Trip</Link>
        </div>
      ) : (
        <div className="feature-grid">
          {trips.map((trip) => (
            <div className="card" key={trip.id}>
              <h2>📍 {trip.destination}</h2>
              <p>📅 {trip.startDate} to {trip.endDate}</p>
              <p>👥 {trip.travelers} traveler(s)</p>
              <p>💰 Budget: ৳{trip.budget}</p>
              <p>🌿 Interest: {trip.interests}</p>
              <Link to="/itinerary">View Itinerary →</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}