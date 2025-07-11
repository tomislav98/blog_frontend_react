import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../styles/posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
function Post() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <section className="post">
      <div className="container">
        <div className="post-content">
          <div className="filter-content">
            <div className="btn-filter">
              <FontAwesomeIcon
                icon={faRectangleList}
                className="label-filter"
              />
              Filter
            </div>
            <div className="pagination">
              {" "}
              <p>Showing 1-12 of 10000+ blog</p>
            </div>
            <div className="dropdown">
              <button onclick="myFunction()" className="dropbtn">
                Dropdown
              </button>
              <div id="myDropdown" className="dropdown-content">
                <a href="#about">About</a>
                <a href="#base">Base</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Contact</a>
                <a href="#custom">Custom</a>
                <a href="#support">Support</a>
                <a href="#tools">Tools</a>
              </div>
            </div>
          </div>
          <div className="card-section">
            <div className="card">
              <div className="header">
                {" "}
                <img src="/post-1.jpg" alt="hero" className="post-image" />
              </div>
              <div className="content">
                <div className="author-section">
                  <div className="label-1">
                    <FontAwesomeIcon icon={faUser} />
                    Admin
                  </div>
                  <div className="label-2">
                    <FontAwesomeIcon icon={faCalendar} />
                    24th april 2024
                  </div>
                </div>
                <div className="content-header">
                  <p>React Performance Tips You Should Know</p>
                </div>
                <div className="content-card">
                  <p>
                    Boost your React apps with these simple yet effective
                    performance tips — from memoization to lazy loading, learn
                    how to keep your UI fast and responsive.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="header">
                {" "}
                <img src="/post-2.jpg" alt="hero" className="post-image" />
              </div>
              <div className="content">
                <div className="author-section">
                  <div className="label-1">
                    <FontAwesomeIcon icon={faUser} />
                    Admin
                  </div>
                  <div className="label-2">
                    <FontAwesomeIcon icon={faCalendar} />
                    24th april 2024
                  </div>
                </div>
                <div className="content-header">
                  <p>React Performance Tips You Should Know</p>
                </div>
                <div className="content-card">
                  <p>
                    Boost your React apps with these simple yet effective
                    performance tips — from memoization to lazy loading, learn
                    how to keep your UI fast and responsive.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="card category-card">
              <h3 className="header-category">Categories</h3>
              <ul className="option-category">
                <li>
                  <span>
                    {" "}
                    <FontAwesomeIcon
                      icon={faCircleRight}
                      className="label-filter"
                    />
                    Technology
                  </span>
                </li>
                <li>
                  <span>
                    {" "}
                    <FontAwesomeIcon
                      icon={faCircleRight}
                      className="label-filter"
                    />
                    Design
                  </span>
                </li>
                <li>
                  <span>
                    {" "}
                    <FontAwesomeIcon
                      icon={faCircleRight}
                      className="label-filter"
                    />
                    Business
                  </span>
                </li>
                <li>
                  <span>
                    {" "}
                    <FontAwesomeIcon
                      icon={faCircleRight}
                      className="label-filter"
                    />
                    Nature
                  </span>
                </li>
                <li>
                  <span>
                    {" "}
                    <FontAwesomeIcon
                      icon={faCircleRight}
                      className="label-filter"
                    />
                    News
                  </span>
                </li>
                <li>
                  <span>
                    {" "}
                    <FontAwesomeIcon
                      icon={faCircleRight}
                      className="label-filter"
                    />
                    Health
                  </span>
                </li>
              </ul>
            </div>
            <div className="card">
              <div className="header">
                {" "}
                <img src="/post-3.jpg" alt="hero" className="post-image" />
              </div>
              <div className="content">
                <div className="author-section">
                  <div className="label-1">
                    <FontAwesomeIcon icon={faUser} />
                    Admin
                  </div>
                  <div className="label-2">
                    <FontAwesomeIcon icon={faCalendar} />
                    24th april 2024
                  </div>
                </div>
                <div className="content-header">
                  <p>React Performance Tips You Should Know</p>
                </div>
                <div className="content-card">
                  <p>
                    Boost your React apps with these simple yet effective
                    performance tips — from memoization to lazy loading, learn
                    how to keep your UI fast and responsive.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Post;
