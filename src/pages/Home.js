import React from 'react';
import './Home.css'; // Assuming a separate CSS file for Home.js

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-heading">Velkomin í Fjármálareiknivélina!</h2>
      <p className="home-paragraph">
        Þessi reiknivél er hönnuð til að hjálpa þér fyrir <strong>Hagverkfræði</strong> lokaprófið með skilvirkum og einföldum hætti.
      </p>
      <p className="home-paragraph">
        Notaðu helstu formúlurnar, reiknaðu dæmi og öðlastu sjálfstraust til að ná árangri í prófinu.
      </p>
      <p className="home-paragraph">
        Mundu, hver útreikningur færir þig nær markmiðinu. Gangi þér vel—þú getur þetta!
      </p>
      <footer className="home-footer">
        Smíðað af <strong>Kristófer Birgir</strong>.
      </footer>
    </div>
  );
};

export default Home;
