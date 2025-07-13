import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../styles/posts.css";
import { ChevronRight } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { UserRound } from "lucide-react";
import { CalendarDays } from "lucide-react";
function Post() {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  return (
    <section className="post">
      <div className="container">
        <div className="flex-row">
          <div className="filter-content">
            <div className="btn-filter">
              <span className="flex-row items-center gap">
                <SlidersHorizontal />
                Filter
              </span>
            </div>
            <div className="pagination">
              {" "}
              <p>Showing 1-12 of 10000+ blog</p>
            </div>
            <div className="dropdown">
              <span>Sort By: </span>
              <button onClick={toggleDropdown} className="dropbtn">
                Default
                <ChevronDown />
              </button>

              {dropDownOpen && (
                <div className="dropdown-content">
                  <a href="#newest">Newest</a>
                  <a href="#oldest">Oldest</a>
                  <a href="#mostpopular">Most popular</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-row">
          <div className="post-content">
            <div className="card-section">
              <div className="card">
                <div className="header">
                  {" "}
                  <img src="/post-1.jpg" alt="hero" className="post-image" />
                </div>
                <div className="content">
                  <div className="author-section">
                    <div className="label-1">
                      <UserRound className="icon" />
                      Admin
                    </div>
                    <div className="label-2">
                      <CalendarDays className="icon" />
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
                      <UserRound className="icon" />
                      Admin
                    </div>
                    <div className="label-2">
                      <CalendarDays className="icon" />
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
                  <img src="/post-3.jpg" alt="hero" className="post-image" />
                </div>
                <div className="content">
                  <div className="author-section">
                    <div className="label-1">
                      <UserRound className="icon" />
                      Admin
                    </div>
                    <div className="label-2">
                      <CalendarDays className="icon" />
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
          <div className="flex-col">
            {" "}
            <div className="card category-card">
              <h3 className="header-category">Categories</h3>
              <ul className="option-category">
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Technology
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Design
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Business
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Nature
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    News
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Health
                  </span>
                </li>
              </ul>
            </div>
            <div className="card tag-card">
              <h3 className="header-tag">Tags</h3>
              <ul className="option-tag">
                <li>prova1</li>
                <li>prova1</li>
                <li>prova1</li>
                <li>prova1</li>
                <li>prova1</li>
                <li>prova1</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Post;
