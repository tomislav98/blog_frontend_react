import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../styles/filter.css";
import { ChevronDown } from "lucide-react";

function Filter({ ordering, setOrdering }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const orderingLabels = {
    "-created_at": "Newest",
    created_at: "Oldest",
    "-view_count": "Most popular",
  };

  return (
    <section className="filter">
      <div className="container">
        <div className="filter-content">
          <div className="items-section">
            <ul>
              <li>Tutorials & How-Tos</li>
              <li>Programming Languages</li>
              <li>Web Development</li>
            </ul>
          </div>
          <div className="dropdown-section">
            <span>Sort By: </span>
            <button onClick={toggleDropdown} className="dropdown-btn">
              <div className="flex-row">
                {orderingLabels[ordering] || "Sort"} <ChevronDown />
              </div>
            </button>

            {dropDownOpen && (
              <ul className="dropdown-content">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setOrdering("-created_at");
                      setDropDownOpen(false);
                    }}
                  >
                    Newest
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setOrdering("created_at");
                      setDropDownOpen(false);
                    }}
                  >
                    Oldest
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setOrdering("-view_count");
                      setDropDownOpen(false);
                    }}
                  >
                    Most popular
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filter;
