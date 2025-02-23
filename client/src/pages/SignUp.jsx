import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formObj = { name, email, password, confirmPassword };
    console.log(formObj);

    setMessage("");

    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email.trim());
    };

    if (!validateEmail(email)) {
      setMessage("Invalid Email");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      return;
    }

    axiosInstance
      .post("/users/register-user", formObj)
      .then((res) => {
        console.log(res);
        alert("User created");

        navigate("/login");
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          console.log("Error", err);
          alert("Error creating user");
        }
      });
  }

  return (
    <div>
      <Layout>
        <div
          className="container card shadow-lg w-50 rounded-5 "
          style={{
            border: "8px solid #b2ebf2",
          }}
        >
          <h1 className="text-center  mb-3">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your Email "
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password"> Set Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                required
              />
            </div>

            {message && (
              <div className="alert alert-danger bg-danger text-white mt-1 p-2">
                {message}
              </div>
            )}
            <div className="form-group d-flex justify-content-center">
              <input
                type="submit"
                className="p-3 m-3 rounded-4"
                style={{
                  backgroundColor: " #b2ebf2",
                  border: "2px solid #b2ebf2",
                }}
              />
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default Signup;
