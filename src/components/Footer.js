// Footer.jsx
import React from "react";
import "./../styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content-1">
        <p>MY WEBSITE</p>
        <p>© 2025 Your Website. All rights reserved.</p>
      </div>
      <hr className="solid" />
      <div className="footer-content-2">
        <div className="footer-content-section-1 ">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio
            suspendisse leo neque laculis molestie sagittis maecenas aenean eget
            molestie sagittis.
          </p>
          <h4>Adress</h4>
          <address>
            123 Main Street,
            <br />
            Springfield, USA
          </address>
          <h4>Phone</h4>
          <p>+1 (234) 567-890</p>
        </div>
        <div className="footer-content-section-2">
          <h4>Quick links</h4>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="footer-content-section-3">
          <h4>Popular tags</h4>
          <div className="tag-list">
            <a href="/tags/javascript" className="tag">
              JavaScript
            </a>
            <a href="/tags/react" className="tag">
              React
            </a>
            <a href="/tags/css" className="tag">
              CSS
            </a>
            <a href="/tags/web-development" className="tag">
              Web Development
            </a>
            <a href="/tags/web-development" className="tag">
              Web Development
            </a>
            <a href="/tags/web-development" className="tag">
              Web Development
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
