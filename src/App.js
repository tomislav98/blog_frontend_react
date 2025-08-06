import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ProfileSettingPage from "./pages/ProfileSettingPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetailsPage />} />
        <Route path="/user-settings/:id" element={<ProfileSettingPage />} />
      </Routes>
    </div>
  );
}

export default App;
