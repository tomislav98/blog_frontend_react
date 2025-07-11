import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../styles/hero.css";

function Hero() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-heading text-xxl">
            Thoughts and code from Kaido's keyboard.
          </h1>
          <p className="hero-text">
            Welcome to Kaido’s Blog — your go-to place for coding tips, tech
            insights, and the occasional deep dive into software craftsmanship.
            Whether you're a beginner or a seasoned developer, I share what I
            learn while building projects, solving problems, and exploring new
            tools. Join me on this journey!
          </p>
        </div>
        <div className="hero-image-container">
          <img src="/hero-photo.jpg" alt="hero" className="hero-image" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
