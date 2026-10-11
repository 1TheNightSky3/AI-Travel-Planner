import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import MyTrips from "./pages/MyTrips";
import Itinerary from "./pages/Itinerary";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [trips, setTrips] = useState([]);

  function addTrip(trip) {
    setTrips((previous) => [...previous, { ...trip, id: Date.now() }]);
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard trips={trips} />} />
          <Route path="/create-trip" element={<CreateTrip addTrip={addTrip} />} />
          <Route path="/my-trips" element={<MyTrips trips={trips} />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}