import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Snowfall from './components/Snowfall';
import Hero from './components/Hero';
import Script from './components/Script';
import Contributors from './components/Contributors';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Snowfall />
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/script" element={<Script />} />
          <Route path="/contributors" element={<Contributors />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
