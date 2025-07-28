// src/components/Login.js
import { useState, useContext } from "react";
import API from "../services/axios";
import "../styles/login.css";
import { UserRound } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [credentials, setCredentials] = useState({
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/login/", credentials);
      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      login();
      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response.data);
      alert("Login failed");
    }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="login-content">
          <div className="image-content">
            <div className="header-image-section">
              <h3 className="header-image">Find you blog</h3>
              <p>
                Join our community and start sharing your thoughts with the
                world.
              </p>
            </div>
          </div>
          <div className="content-2">
            <form onSubmit={handleLogin}>
              <div className="header-container">
                <h3 className="header-form">Welcome back to the blog</h3>
                <span className="">Login in your account</span>
              </div>
              <label htmlFor="emailInput">Your username</label>
              <div className="input-container">
                <UserRound color="#6c757d" />
                <input
                  name="user_name"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="passwordInput">Password</label>
              <div className="input-container">
                <LockKeyhole color="#6c757d" />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div className="check-container">
                <label htmlFor="" className="remember">
                  <input type="checkbox" name="subscribe" />
                  Remember Password
                </label>
                <span className="forgot-password">Forgot Password?</span>
              </div>

              <button type="submit" className="btn btn-dark">
                Login
              </button>
              <label htmlFor="noAccountRegister" className="no-account">
                No account yet? <span className="register">Register</span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
