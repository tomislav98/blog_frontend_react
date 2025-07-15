import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import "font-awesome/css/font-awesome.min.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
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

            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/create-blog">Create Blog</Link>
                </li>
                <li>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      localStorage.removeItem("access_token");
                      logout();
                      navigate("/");
                      // optionally navigate away or refresh
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/signup" className="btn btn-dark">
                    <i className="fa fa-user"></i> Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
