import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Calculator from "./components/Calculator/Calculator";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Hagverkfræði App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </main>
        <footer>
          <p>Created by Kristófer Birgir</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
