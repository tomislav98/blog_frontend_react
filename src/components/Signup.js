// src/components/Signup.js

import API from "../services/axios";
import "../styles/global.css";
import "../styles/signup.css";
import { UserRound } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { Mail } from "lucide-react";
import React, { useState, useContext, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Sending data:", formData);
    try {
      const res = await API.post("/api/register/", formData);
      console.log("User registered:", res.data);
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err.response.data);
      alert("Registration failed");
    }
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // slow down video
    }
  }, []);

  return (
    <section className="signup">
      <div className="signup-content">
        <div className="video-content">
          <video ref={videoRef} id="myVideo1" autoPlay loop muted playsInline>
            <source src="/sign-up-background.mp4" type="video/mp4" />
          </video>

          <div className="flex-col">
            <h3 className="header-video">Find you blog</h3>
            <p>
              Join our community and start sharing your thoughts with the world.
            </p>
          </div>
        </div>
        <div className="content-2">
          <form onSubmit={handleSignup}>
            <div className="header-container">
              <h3 className="header-form">Create an Account</h3>
              <span className="">Signup in your account</span>
            </div>

            <label htmlFor="user_name">Username</label>
            <div className="input-container">
              <UserRound color="#6c757d" />
              <input
                id="user_name"
                name="user_name"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>

            <label htmlFor="email">Your email</label>
            <div className="input-container">
              <Mail color="#6c757d" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="input-container">
              <LockKeyhole color="#6c757d" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <label htmlFor="password2">Confirm Password</label>
            <div className="input-container">
              <LockKeyhole color="#6c757d" />
              <input
                id="password2"
                name="password2"
                type="password"
                placeholder="Confirm password"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-dark">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
