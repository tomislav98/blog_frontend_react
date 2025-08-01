// src/pages/HomePage.js
import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import { useState } from "react";

function HomePage() {
  const [ordering, setOrdering] = useState("-created_at");
  return (
    <div>
      <Navbar />
      <Filter ordering={ordering} setOrdering={setOrdering} />
      <BlogList ordering={ordering} />
      <Footer />
    </div>
  );
}

export default HomePage;
