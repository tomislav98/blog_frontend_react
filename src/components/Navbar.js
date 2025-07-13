import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import "font-awesome/css/font-awesome.min.css";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <a href="#">
            <img src="/logo.png" alt="logo" className="logo-img" />
          </a>
        </div>
        <div className="main-menu">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Popular</a>
            </li>
            <li>
              <div className="form">
                {" "}
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                />
                <i className="fa fa-search"></i>
              </div>
            </li>

            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <a className="btn btn-dark" href="#">
                <i className="fa fa-user"></i>
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
