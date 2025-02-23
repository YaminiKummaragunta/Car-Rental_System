import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Cars from "../pages/Cars";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import CarBooking from "../pages/CarBooking";
import MyCars from "../pages/MyCars";
import RentalHistoryPage from "../pages/RentalHistoryPage";

function NavRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/my-cars" element={<MyCars />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/bookings/:id" element={<CarBooking />} />
        <Route path="/rental-history/" element={<RentalHistoryPage />} />
        {/* Redirect invalid paths to home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NavRoutes;
