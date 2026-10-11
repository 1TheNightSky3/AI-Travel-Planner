import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">YOUR SMART TRAVEL COMPANION</div>
        <h1>Discover the world, your way.</h1>
        <p>
          Plan your perfect journey with personalized itineraries,
          smart budgets, and travel recommendations.
        </p>
        <Link className="btn" to="/create-trip">Plan Your Trip →</Link>
      </section>

      <h2>Everything you need for your next adventure</h2>
      <div className="feature-grid">
        <div className="card">
          <h3>✨ AI Itinerary</h3>
          <p>Organize your journey with a day-by-day travel plan.</p>
        </div>
        <div className="card">
          <h3>💰 Budget Planning</h3>
          <p>Set a travel budget and keep track of your plans.</p>
        </div>
        <div className="card">
          <h3>🏨 Smart Recommendations</h3>
          <p>Explore accommodation and destination ideas.</p>
        </div>
      </div>
    </>
  );
}