// src/pages/HomePage.js
import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import { useState } from "react";

function HomePage() {
  const [ordering, setOrdering] = useState("-created_at");
  return (
    <>
      <Navbar />
      <Hero />
      <AboutMe />
      {/* <Filter ordering={ordering} setOrdering={setOrdering} />*/}
      {/* <BlogList ordering={ordering} />*/}
      <Footer />
    </>
  );
}

export default HomePage;
