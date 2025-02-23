import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    fetch("http://localhost:80/users/logout-user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem("token");
          alert("Logged out");
          navigate("/login");
        } else {
          alert("Error");
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid ">
          <Link className="navbar-brand " to="/cars">
            CleanDrive Rentals
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav ">
            <ul className="navbar-nav ms-auto text-white">
              <li className="nav-item">
                <Link className="nav-link " to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-cars">
                  Cars
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/rental-history">
                  History
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/about">
                  About Us
                </Link>
              </li>
              {token ? (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sign-up">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
