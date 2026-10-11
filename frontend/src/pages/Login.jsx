import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="card auth-card">
      <h1>Welcome Back 👋</h1>
      <p>Sign in to continue planning your adventures.</p>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Login backend is not connected yet.");
      }}>
        <label>Email Address</label>
        <input type="email" placeholder="Enter your email" required />

        <label>Password</label>
        <input type="password" placeholder="Enter password" required />

        <button className="btn" type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}