import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"; // Import Footer component
import Home from "./components/Home/Home";
import Calculator from "./components/Calculator/Calculator";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </main>
        <Footer /> {/* Add Footer */}
      </div>
    </Router>
  );
};

export default App;
