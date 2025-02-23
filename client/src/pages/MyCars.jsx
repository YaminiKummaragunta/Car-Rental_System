import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";

// import { useNavigate } from "react-router-dom";

function MyCars() {
  const [cars, setCars] = useState([]);

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
    axiosInstance
      .get("/cars/get-all-cars")
      .then((res) => {
        console.log(res.data);
        setCars(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function displayCars() {
    // Helper function to split cars into chunks of 4
    const chunkArray = (arr, chunkSize) => {
      const result = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
      }
      return result;
    };

    // Split cars into chunks of 4
    const carChunks = chunkArray(cars, 4);

    return (
      <div className="container">
        {carChunks.map((chunk, rowIndex) => (
          <div key={rowIndex} className="row mb-4">
            {chunk.map((car, index) => (
              <div key={index} className="col-md-3">
                <div className="card border-primary h-100">
                  <div className="card-body">
                    <h5 className="card-title">Car Name: {car.make}</h5>
                    <p className="card-text">Model: {car.model}</p>
                    <p className="card-text">Year: {car.year}</p>
                    <p className="card-text">
                      Price Per Day: {car.pricePerDay}
                    </p>
                    <p className="card-text">
                      Availability:
                      <span
                        className={`px-3 py-1 rounded border ${
                          car.availability.toLowerCase() === "yes"
                            ? "text-white border-success bg-success"
                            : "text-white border-danger bg-danger"
                        }`}
                      >
                        {car.availability}
                      </span>
                    </p>
                    <Link
                      to={`/bookings/${car._id}`}
                      state={{
                        carName: car.make,
                        pricePerDay: car.pricePerDay,
                        carId: car._id,
                      }}
                    >
                      <button className="btn btn-primary w-100">
                        Book now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Layout>
        <h2 className="fw-semibold text-center text-primary">
          Select a car for booking
        </h2>
        <div className="d-flex m-2">{displayCars()}</div>
      </Layout>
    </div>
  );
}

export default MyCars;
