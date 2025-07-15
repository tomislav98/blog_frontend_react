import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <div>
      <header></header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/blogs" element={<BlogPage />} />
      </Routes>
    </div>
  );
}

export default App;
