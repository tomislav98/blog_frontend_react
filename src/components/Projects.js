import "../styles/projects.css";
import { useInView } from "react-intersection-observer";
import { BriefcaseBusiness, Handshake, Star } from "lucide-react";

function Projects() {
  return (
    <section className="projects">
      <div className="container">
        <div className="flex-col">
          <h2 className="text-xxl">Projects</h2>
          <div className="flex-row">
            <div className="card">
              <div className="header-section">
                <BriefcaseBusiness className="icon" />
              </div>
              <div className="content-section">
                <h3>Completed</h3>
                <p>15+ Finished projects</p>
              </div>
            </div>
            <div className="card">
              <div className="header-section">
                <Handshake className="icon" />
              </div>

              <div className="content-section">
                <h3>Clients</h3>
                <p>25+ Happy Clients</p>
              </div>
            </div>

            <div className="card">
              <div className="header-section">
                <Star className="icon" />
              </div>

              <div className="content-section">
                <h3>Experience</h3>
                <p>7+ Years in the field</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
