import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";

function Cars() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [availability, setAvailability] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      alert("You must be logged in to view this page");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formObj = { make, model, year, pricePerDay, availability };
    console.log(formObj);

    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
      alert("Unauthorized access. Please login.");
      Navigate("/login");
      return;
    }

    axiosInstance
      .post("/cars/add-car", formObj, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      })

      .then((res) => {
        console.log(res.data);
        alert("Car added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Layout>
        <div className="container card shadow-lg w-50 border border-5 border-primary p-5 rounded-4">
          <h1 className="text-center">Create Cars</h1>
          <form className="" onSubmit={handleSubmit}>
            <div className="form-group p-1">
              <label htmlFor="make">Make:</label>
              <input
                type="text"
                name="make"
                id="make"
                className="form-control"
                onChange={(event) => setMake(event.target.value)}
              />
            </div>
            <div className="form-group p-1">
              <label htmlFor="model">Model:</label>
              <input
                type="text"
                name="model"
                id="model"
                className="form-control"
                onChange={(event) => setModel(event.target.value)}
              />
            </div>
            <div className="form-group p-1">
              <label htmlFor="year">Year:</label>
              <input
                type="text"
                name="year"
                id="year"
                className="form-control"
                onChange={(event) => setYear(event.target.value)}
              />
            </div>
            <div className="form-group p-1">
              <label htmlFor="pricePerDay">Price Per Day:</label>
              <input
                type="text"
                name="pricePerDay"
                id="pricePerDay"
                className="form-control"
                onChange={(event) => setPricePerDay(event.target.value)}
              />
            </div>
            <div className="form-group p-1">
              <label htmlFor="availability">Availability:</label>
              <input
                type="text"
                name="availability"
                id="availability"
                className="form-control"
                onChange={(event) => setAvailability(event.target.value)}
              />
            </div>
            <div className="form-group d-flex justify-content-center p-1">
              <button type="submit" className="btn btn-primary p-3 m-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default Cars;
