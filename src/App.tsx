import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Events from './pages/Events';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header 
          logo="/assets/images/logo.png"
          organizationName="Hemja Welfare Society"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
