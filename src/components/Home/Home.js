import React from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator, faChartLine, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-heading">Hagverkfræði Reiknivélin</h2>
      <p className="home-paragraph">
        Leystu Hagverkfræði vandamálin auðveldlega! Good luck! 
      </p>
      <div className="icon-container">
        <FontAwesomeIcon icon={faCalculator} size="3x" className="home-icon calculator" />
        <FontAwesomeIcon icon={faChartLine} size="3x" className="home-icon chart" />
        <FontAwesomeIcon icon={faMoneyBillWave} size="3x" className="home-icon money" />
      </div>
    </div>
  );
};

export default Home;
