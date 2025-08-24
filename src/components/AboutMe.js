import "../styles/about-me.css";
import { useInView } from "react-intersection-observer";

function AboutMe() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    rootMargin: "-100px 0px",
  });

  return (
    <section className="about-me">
      <h2 className={`text-xxl ${inView ? "animate" : ""}`} ref={ref}>
        About me
      </h2>
      <div className="flex-row">
        <div className={`section-1 ${inView ? "animate" : ""}`} ref={ref}>
          <div className="card">
            <h3>My introduction</h3>
            <p>
              I’m a passionate web developer with experience in building modern,
              user-friendly applications. I specialize in front-end development
              using React and Angular, creating clean and responsive interfaces.
              On the back-end, I work with powerful frameworks to design robust
              APIs and scalable systems.
            </p>
          </div>
        </div>
        <div className={`section-2 ${inView ? "animate" : ""}`} ref={ref}>
          <div className="list-container">
            <h3>Frontend</h3>
            <ul>
              <li className="badge">HTML</li>
              <li className="badge">CSS</li>
              <li className="badge">React</li>
              <li className="badge">Javascript</li>
            </ul>
          </div>
          <div className="list-container">
            <h3>Backend</h3>
            <ul>
              <li className="badge">Java</li>
              <li className="badge">Python</li>
              <li className="badge">Django</li>
              <li className="badge">C++</li>
            </ul>
          </div>
          <div className="list-container">
            <h3>Database</h3>
            <ul>
              <li className="badge">PostgreSQL</li>
              <li className="badge">MongoDB</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
