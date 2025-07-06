// src/components/Signup.js
import { useState } from "react";
import API from "../api/axios";
import "../styles/global.css";

function Signup() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register/", formData);
      console.log("User registered:", res.data);
      alert("User registered successfully");
    } catch (err) {
      console.error("Registration error:", err.response.data);
      alert("Registration failed");
    }
  };

  return (
    <div className="page-container">
      <div className="left-container">
        <div className="register-section">
          <div className="register-title">
            <b>Register</b>
          </div>
          <div className="helper-text">
            Already have an account? <b>Sign in </b>
            now, or
          </div>
        </div>
      </div>

      <div className="right-container">
        <form onSubmit={handleSubmit}>
          <h1>Create an account</h1>
          <div className="form-group">
            <input
              name="user_name"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="form-group">
              <input
                name="password2"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" required />
              <span>I agree to the Terms and Policy</span>
            </label>
          </div>

          <div className="form-group-button">
            <button type="submit">SUBMIT & REGISTER</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
