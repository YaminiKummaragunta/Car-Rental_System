import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function RentalHistoryPage() {
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      alert(" Please login first");
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        alert("Your session has expired");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    // Assuming you have an API endpoint to fetch the user's bookings
    axiosInstance
      .get("/bookings/get-bookings") // Modify with proper user filtering if needed
      .then((res) => {
        console.log(res.data);
        setHistory(res.data.history || []); // Adjust based on API response
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <div className="container card shadow-lg w-75 p-4 border border-4 border-primary rounded-5">
        <h1 className="fw-light text-center mb-3 p-3">Rental History</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Booking Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(history) && history.length > 0 ? (
              history.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{formatDate(booking.bookingDate)}</td>
                  <td>{formatDate(booking.endDate)}</td>
                  <td>{booking.price}</td>
                  <td>{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No rental history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default RentalHistoryPage;
