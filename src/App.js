import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div>
      <header>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=account_circle"
        />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
