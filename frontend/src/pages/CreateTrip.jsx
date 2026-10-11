import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTrip({ addTrip }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "",
    interests: "Nature",
    accommodation: "Hotel",
    transport: "Public Transport",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.endDate < form.startDate) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    addTrip(form);
    navigate("/my-trips");
  }

  return (
    <div className="card form-card">
      <div className="eyebrow">LET'S PLAN SOMETHING GREAT</div>
      <h1>Create Your Trip ✈️</h1>
      <p>Tell us a little about your upcoming adventure.</p>

      <form onSubmit={handleSubmit}>
        <label>Destination</label>
        <input name="destination" value={form.destination}
          onChange={handleChange} placeholder="e.g. Cox's Bazar" required />

        <div className="form-row">
          <div>
            <label>Start Date</label>
            <input type="date" name="startDate" value={form.startDate}
              onChange={handleChange} required />
          </div>
          <div>
            <label>End Date</label>
            <input type="date" name="endDate" value={form.endDate}
              onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>Travelers</label>
            <input type="number" name="travelers" min="1"
              value={form.travelers} onChange={handleChange} required />
          </div>
          <div>
            <label>Budget (BDT)</label>
            <input type="number" name="budget" min="1"
              value={form.budget} onChange={handleChange} required />
          </div>
        </div>

        <label>Travel Interests</label>
        <select name="interests" value={form.interests} onChange={handleChange}>
          <option>Nature</option>
          <option>Adventure</option>
          <option>Culture</option>
          <option>Food</option>
          <option>Shopping</option>
        </select>

        <label>Accommodation</label>
        <select name="accommodation" value={form.accommodation} onChange={handleChange}>
          <option>Hotel</option>
          <option>Resort</option>
          <option>Hostel</option>
          <option>Guesthouse</option>
        </select>

        <label>Transport</label>
        <select name="transport" value={form.transport} onChange={handleChange}>
          <option>Public Transport</option>
          <option>Private Car</option>
          <option>Train</option>
          <option>Flight</option>
        </select>

        <button className="btn" type="submit">Save Trip →</button>
      </form>
    </div>
  );
}