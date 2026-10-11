import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">🌍 TravelGenie</NavLink>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/create-trip">Create Trip</NavLink>
        <NavLink to="/my-trips">My Trips</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  );
}