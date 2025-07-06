import "./App.css";
import { Global, css } from "@emotion/react";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <GlobalStyles />
      <HomePage />
    </div>
  );
}

const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      body {
        background-color: #ffffff;
        font-family: "Poppins", sans-serif;
      }
      * {
        box-sizing: border-box;
      }
    `}
  />
);

export default App;
