import React from "react";
import { Link } from "react-router-dom";

export default function Itinerary() {
  return (
    <div className="card form-card">
      <div className="eyebrow">PERSONALIZED TRAVEL PLANNING</div>
      <h1>✨ AI Itinerary</h1>
      <p>
        Your day-by-day AI-generated travel plan will appear here.
      </p>

      <div className="info-panel">
        <h3>Coming next</h3>
        <p>Daily activities, accommodation suggestions, transport,
          estimated costs and travel tips.</p>
      </div>

      <p>This page will connect to the AI backend later.</p>
      <Link className="btn" to="/create-trip">Create a Trip</Link>
    </div>
  );
}