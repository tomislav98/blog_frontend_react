import React, { useState } from "react";
import "../styles/global.css";
import "../styles/header.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header>
      <div className="left-group">
        <h1>My Website</h1>
        <nav>
          <div>
            <a href="/">Home</a>
          </div>

          <div>
            <a href="/about">About</a>
          </div>

          <div>
            <a href="/contact">Contact</a>
          </div>
        </nav>
      </div>
      <div className="right-group">
        <div className="search-container">
          {!searchOpen && (
            <MagnifyingGlassIcon
              className="search-icon"
              onClick={() => setSearchOpen(true)}
            />
          )}

          {searchOpen && (
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              onBlur={() => setSearchOpen(false)}
              className="search-input"
            />
          )}
        </div>

        <button className="search-button">Search</button>
      </div>
    </header>
  );
}

export default Header;
