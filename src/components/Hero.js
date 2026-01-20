import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import heroImage from '../assets/hero-image.png';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-tagline">Coldest Exploit</p>
        <h1 className="hero-title">The Snoe Project</h1>
        <p className="hero-description">The best script cheat available in the market. Unmatched performance and reliability for serious scripters.</p>
        <div className="hero-buttons">
          <button onClick={() => navigate('/script')} className="btn btn-primary">Get Script</button>
          <a href="#tutorial" className="btn btn-secondary">Tutorial <span className="arrow">→</span></a>
        </div>
      </div>
      <div className="hero-right">
        <img src={heroImage} alt="Snoe Project" />
      </div>
    </section>
  );
};

export default Hero;
