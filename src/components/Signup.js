// src/components/Signup.js
import { useState } from "react";
import API from "../services/axios";
import "../styles/global.css";
import "../styles/signup.css";
import { UserRound } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { Mail } from "lucide-react";

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

  return (
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <div className="image-content">
            <div className="header-image-section">
              <h3 className="header-image">Find you blog</h3>
              <p>
                Join our community and start sharing your thoughts with the
                world.
              </p>
            </div>
          </div>
          <div className="content-2">
            <form onSubmit={handleSignup}>
              <div className="header-container">
                <h3 className="header-form">Create an Account</h3>
                <span className="">Signup in your account</span>
              </div>

              <label htmlFor="userInput">Username</label>
              <div className="input-container">
                <UserRound color="#6c757d" />
                <input
                  name="user_name"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="emailInput">Your email</label>
              <div className="input-container">
                <Mail color="#6c757d" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="passwordInput">Password</label>
              <div className="input-container">
                <LockKeyhole color="#6c757d" />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="passwordInput">Confirm Password</label>
              <div className="input-container">
                <LockKeyhole color="#6c757d" />
                <input
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
      </div>
    </section>
  );
}

export default Signup;
