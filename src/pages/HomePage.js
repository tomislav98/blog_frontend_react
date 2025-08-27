// src/pages/HomePage.js
import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import { useState } from "react";
import Projects from "../components/Projects";

function HomePage() {
  const [ordering, setOrdering] = useState("-created_at");
  return (
    <>
      <Navbar />
      <Hero />
      <AboutMe />
      <Projects />
      {/* <Filter ordering={ordering} setOrdering={setOrdering} />*/}
      {/* <BlogList ordering={ordering} />*/}
      <Footer />
    </>
  );
}

export default HomePage;
