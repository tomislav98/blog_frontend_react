import "../styles/profile-setting.css";
import {
  UserRound,
  CreditCard,
  FileText,
  Repeat,
  Banknote,
} from "lucide-react";
import { Link } from "react-router-dom";

import UserProfileIcon from "./UserProfileIcon";
import { useState } from "react";

export default function ProfileSetting() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Optional: validate inputs
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Form submitted:", formData);

    setSubmitted(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="profile-setting">
      <div className="flex-container">
        <div className="setting-container">
          <label htmlFor="settings">Settings</label>
          <ul>
            <li>
              <Link to="/account">
                <UserRound className="menu-icon" />
                Account
              </Link>
            </li>
            <li>
              <Link to="/payments">
                <CreditCard className="menu-icon" />
                Payments
              </Link>
            </li>
            <li>
              <Link to="/invoices">
                <FileText className="menu-icon" />
                Invoices
              </Link>
            </li>
            <li>
              <Link to="/subscriptions">
                <Repeat className="menu-icon" />
                Subscriptions
              </Link>
            </li>
            <li>
              <Link to="/payment-methods">
                <Banknote className="menu-icon" />
                Payment methods
              </Link>
            </li>
          </ul>
        </div>

        <div className="personal-info-container">
          <div className="account-section">
            <h3>Account</h3>
            <p>Manage your profile track activities and customize settings.</p>
          </div>
          <div className="personal-info-section">
            <div className="personal-info-header">
              <h3>Personal information</h3>
              <p>Provide information so your account can operate correctly.</p>
              <label htmlFor="profile">Profile</label>
              <div className="flex-row">
                <UserProfileIcon />
                <button className="btn btn-secondary-md">Replace logo</button>
              </div>
            </div>
            <form className="form-section" onSubmit={handleSubmit}>
              <div className="flex-row">
                <div>
                  <label>Name</label>
                  <br />
                  <div className="input-container-md">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label>Email</label>
                  <br />
                  <div className="input-container-md">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-row">
                <div>
                  <label>Date of birth</label>
                  <br />
                  <div className="input-container-md">
                    <input
                      type="text"
                      name="date of birth"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your date of birth"
                    />
                  </div>
                </div>

                <div>
                  <label>Website</label>
                  <br />
                  <div className="input-container-md">
                    <input
                      type="email"
                      name="website"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your website"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-row">
                <div>
                  <label>Country</label>
                  <br />
                  <div className="input-container-md">
                    <input
                      type="text"
                      name="country"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your country"
                    />
                  </div>
                </div>

                <div>
                  <label>City</label>
                  <br />
                  <div className="input-container-md">
                    <input
                      type="email"
                      name="city"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your city"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-row">
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </form>

            <div className="password-section">
              <h3>Password</h3>
              <p>Set the password that is unique.</p>
              <div className="flex-row">
                <button className="btn btn-secondary">Reset password</button>
              </div>
            </div>

            <div className="two-factor-authentication-section">
              <h3>Two-Factor Authentication</h3>
              <p>
                Add an extra layer of the security to your account. it's highly
                recommended.
              </p>
              <div className="flex-row">
                <button className="btn btn-secondary">
                  Set up authentication
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
