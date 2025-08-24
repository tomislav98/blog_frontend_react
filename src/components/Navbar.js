import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import "../styles/global.css";
import "font-awesome/css/font-awesome.min.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { UserRound } from "lucide-react";
import UserProfileIcon from "./UserProfileIcon";

function BlogTags({ tags }) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <Link key={tag.id} to={`/tags/${tag.slug}`} className="tag">
          #{tag.name}
        </Link>
      ))}
    </div>
  );
}

function getHeroContent(pathname, blog) {
  if (pathname === "/blogs") {
    return {
      heroTitle: "Explore Our Latest Blogs",
      heroDescription1: "Find insightful posts on coding and tech.",
      heroDescription2:
        "Stay updated with the latest trends anheroTitled tutorials.",
    };
  } else if (pathname === "/create-blog") {
    return {
      heroTitle: "Create Your Own Blog Post",
      heroDescription1: "Share your knowledge with the community.",
      heroDescription2: "Write about what you’re passionate about.",
    };
  } else if (pathname === "/login") {
    return {
      heroTitle: "Welcome Back!",
      heroDescription1: "Log in to access your personalized dashboard.",
      heroDescription2: "Let’s get you back to coding.",
    };
  } else if (/^\/blogs\/\d+$/.test(pathname)) {
    // Use dynamic blog data if available
    return {
      heroTitle: blog?.title || "Reading Blog Post",
      heroDescription1: blog
        ? blog.summary || "Dive deep into this insightful article."
        : "Dive deep into this insightful article.",
      heroDescription2: blog?.user?.user_name
        ? `Written by ${blog.user.user_name} on ${new Date(blog.created_at).toLocaleDateString()}`
        : "Enjoy the content and share your thoughts below.",
    };
  } else {
    return {
      heroTitle: "Hi, I'm Kaido 👋",
      heroDescription1:
        "Welcome to Kaido’s Blog — your go-to place for coding tips, tech insights, and the occasional deep dive into software craftsmanship.",
      heroDescription2:
        "Whether you're a beginner or a seasoned developer, I share what I learn while building projects, solving problems, and exploring new tools. Join me on this journey!",
    };
  }
}

function Navbar({ blog }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const { heroTitle, heroDescription1, heroDescription2 } = getHeroContent(
    location.pathname,
    blog,
  );

  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="container">
        <div className="menu-container">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fa fa-bars"></i>
          </button>

          <div className={`main-menu ${menuOpen ? "open" : ""}`}>
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
                  <li className="user-profile">
                    <Link to={`/user-settings/${blog?.id}`}>
                      <UserProfileIcon color="black" />
                    </Link>
                  </li>
                  <li>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        localStorage.removeItem("access_token");
                        logout();
                        navigate("/");
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
                    <Link to="/signup" className="btn btn-primary">
                      <i className="fa fa-user"></i> Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
