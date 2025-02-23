import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function CarBooking() {
  const location = useLocation();
  const { carName, pricePerDay, carId } = location.state || {}; // Retrieve passed data

  const [name, setName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [status, setStatus] = useState("");

  // Function to calculate price based on date range
  useEffect(() => {
    if (bookingDate && endDate) {
      const startDate = new Date(bookingDate);
      const endDateObj = new Date(endDate);
      const timeDiff = endDateObj - startDate;

      if (timeDiff < 0) {
        alert("End date cannot be before start date.");
        setCalculatedPrice(0); // Reset price
      } else {
        const days = timeDiff / (1000 * 3600 * 24); // Convert to days
        const price = days * pricePerDay; // Calculate price
        setCalculatedPrice(price);
      }
    }
  }, [bookingDate, endDate, pricePerDay]);

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !bookingDate || !endDate || !calculatedPrice || !status) {
      alert("Please fill in all fields.");
      return;
    }

    const formObj = {
      name: name,
      bookingDate: bookingDate,
      endDate: endDate,
      price: calculatedPrice,
      status: status,
      carId: carId, // Send car ID to backend
    };

    axiosInstance
      .post("/bookings/create-bookings", formObj)
      .then((res) => {
        console.log(res.data);
        alert("Booked Successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Error booking car");
      });
  }

  return (
    <Layout>
      <div
        className="container card-red shadow-lg w-75 p-4 rounded-5"
        style={{ border: "8px solid #b2ebf2" }}
      >
        <h1 className="fw-light text-center mb-3 p-3">Booking of {carName}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Enter your name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="bookingDate">From: </label>
            <input
              type="date"
              className="form-control"
              id="bookingDate"
              value={bookingDate}
              onChange={(event) => setBookingDate(event.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="endDate">To: </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="price">Total Price: ₹{calculatedPrice}</label>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="status">Status:</label>
            <select
              className="form-control"
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">Select Status...</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group d-flex justify-content-center mt-2">
            <input type="submit" className=" btn btn-primary p-3 m-2" />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CarBooking;
