import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="card auth-card">
      <h1>Create Account ✨</h1>
      <p>Join TravelGenie and explore the world.</p>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Registration backend is not connected yet.");
      }}>
        <label>Full Name</label>
        <input type="text" placeholder="Enter your name" required />

        <label>Email Address</label>
        <input type="email" placeholder="Enter email" required />

        <label>Password</label>
        <input type="password" placeholder="Create password" required />

        <button className="btn" type="submit">Register</button>
      </form>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}