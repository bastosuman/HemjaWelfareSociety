import React from 'react';
import Header from '../components/Header';
import './Events.css';

const Events: React.FC = () => {
  return (
    <>
      <Header />
      <main className="events-container">
        <div className="coming-soon">
          <h1>Events</h1>
          <div className="message">
            <span className="emoji">📅</span>
            <p>Will update you shortly</p>
            <span className="emoji">✨</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Events; 