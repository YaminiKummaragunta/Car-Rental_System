import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function About() {
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
  return (
    <Layout>
      <h1 className="text-black text-center py-4">About Us</h1>

      <div className="container mt-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Welcome to <span className="text-primary">CleanDrive Rentals</span>!
          </h2>
          <p className="lead">
            Your trusted partner for seamless, affordable, and reliable car
            rentals.
          </p>
        </div>

        <div className="row mb-5">
          <div className="col-md-6">
            <img
              width={350}
              src="data:image/jpeg;base64,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9mMxE52+26nlgE1z9ILi+F04hDej9rpoJBfcFacCXswFKspXO85GBVMWLcTmIehXxXV10bKq8x8I7fJ+dFermKzuBcdqZWUEKGULtJ4buZ44yPjV1mjDKVPJgQfceFUGe7ut+rAGfekNwbfAmPERJs7EGPsid+cbXLZ7q55Lq9XTX3m4Fwt3GpUdo7JDvjyFlRC8sZTc29VJAYrjK4qymimmMQyX9Rcv177k5l1dHurNbW4juFuWZoiTgoBkFSpGd3gTX5pPVkkNylybhnZH7TBQDc3Pnu4ceNXXSHJgiJzkxoTu3ZyVHPeFfP2gD4gGuuoRZojs0VcS1NWZmvrGJ6dPd5yqHTLoJHfyJKZDE6qVJVQ28ZyM5I5Zb51K9FNDazh7AzGVFJKFl2lAeO3mcjOT8amqVKKKYq3Y5qatVdqtRZmr9MdIKUpU2cpSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlB//2Q=="
              alt="Car Rental Service"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold">Our Story</h3>
            <p>
              Founded in <strong>[2019]</strong>, we aim to redefine car rentals
              by making it simple and hassle-free. Whether it's a family trip,
              business meeting, or a quick getaway, our cars are always ready to
              hit the road with you.
            </p>
            <p>
              Our focus on quality and customer satisfaction has made us a
              preferred choice for car rentals.
            </p>
          </div>
        </div>

        <div className="row text-center mb-5">
          <h3 className="fw-bold mb-4">Why Choose Us?</h3>
          <div className="col-md-3">
            <div className="card border-primary shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">Wide Selection</h5>
                <p className="card-text">
                  Choose from a variety of vehicles that fit your every need.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-primary shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">Affordable Prices</h5>
                <p className="card-text">
                  Transparent and competitive pricing with no hidden fees.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-primary shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">24/7 Support</h5>
                <p className="card-text">
                  We're here to assist you anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-primary shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">Convenience</h5>
                <p className="card-text">
                  Easy-to-use online booking system at your fingertips.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="fw-bold">Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:loginbydefault@gmail.com">
              cleandriverentals@gmail.com
            </a>
          </p>
          <p>Phone: +9108105199</p>
          <p>Location: Yelahanka, Bangalore</p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
