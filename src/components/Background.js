import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../styles/hero.css";
import "../styles/background.css";

function Background() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <section className="background">
      <div className="container"></div>
    </section>
  );
}

export default Background;
