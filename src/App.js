import HomePage from "./pages/HomePage";
import Hero from "./components/Hero";
import Post from "./components/Post";
import "./styles/global.css";
function App() {
  return (
    <div>
      <header>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=account_circle"
        />
      </header>
      <HomePage />
      <Hero />
      <Post />
    </div>
  );
}

export default App;
