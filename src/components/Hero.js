import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="full-container">
        <div className="section-1">
          <h1 className="text-xxl">Hi, I'm Kaido 👋 Welcome to Kaido’s Blog</h1>
          <h4 className="text-xl">
            your go-to place for coding tips, tech insights, and the occasional
            deep dive into software craftsmanship.
          </h4>
          <button className="btn hero-button">Start Learning</button>
        </div>
        <div className="section-2">
          <img src="/Serene Workspace.png" alt="not-found" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
