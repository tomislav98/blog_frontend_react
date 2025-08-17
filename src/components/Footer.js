import React from "react";
import "./../styles/footer.css";
import { ArrowRight } from "lucide-react";
import { Mail } from "lucide-react";

const handleSubscribeUs = async (e) => {
  e.preventDefault();
  try {
    //const res = await API.post("/api/login/", credentials);
    //const { access, refresh } = res.data;
    // localStorage.setItem("access", access);
    //localStorage.setItem("refresh", refresh);
    //login();
    alert("Login successful");
    //navigate("/");
  } catch (err) {
    console.error("Login error:", err.response.data);
    alert("Login failed");
  }
};

const Footer = () => {
  return (
    <footer>
      <div className="container-footer">
        <div className="footer-content-1">
          <p>
            Your friendly guide through the world of code and tech. Join us as
            we explore new technologies, share coding tips, and simplify complex
            concepts—helping you grow your skills and stay ahead in the digital
            world.
          </p>
          <p>© 2025 Your Website. All rights reserved.</p>
        </div>
        <div className="footer-content-2">
          <div className="flex-row-content-2">
            <div className="flex-col">
              <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Gallery</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="flex-col">
              <ul>
                <li>Contents</li>
                <li>Stories</li>
                <li>Guides</li>
              </ul>
            </div>
          </div>
          <div className="flex-row">
            <button className="btn btn-secondary">
              SUPPORT US <ArrowRight />
            </button>
            <p>
              fund independent journal
              <br /> with 10$ per month
            </p>
          </div>
        </div>
        <div className="footer-content-3">
          <h3>
            <Mail />
            Subscribe Us
          </h3>
          <p>
            Stay in the loop! Subscribe to get the latest updates, news, and
            tips delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubscribeUs}>
            <div className="flex-col">
              <div className="input-container">
                <input
                  name="user_name"
                  type="text"
                  placeholder="Your Email Address"
                />
              </div>

              <button className="btn btn-primary">SUBSCRIBE</button>
            </div>
          </form>
          <span>
            Want to become a contributor? <a href="/contribute">Click here</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
