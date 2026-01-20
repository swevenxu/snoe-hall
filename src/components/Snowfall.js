import React, { useEffect, useRef } from 'react';
import './Snowfall.css';

const Snowfall = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const snowflakeCount = 50;

    for (let i = 0; i < snowflakeCount; i++) {
      createSnowflake(container);
    }

    return () => {
      // Cleanup snowflakes on unmount
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  const createSnowflake = (container) => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // Random properties
    const size = Math.random() * 4 + 2; // 2-6px
    const left = Math.random() * 100; // 0-100%
    const animationDuration = Math.random() * 10 + 10; // 10-20s
    const animationDelay = Math.random() * -20; // stagger start
    const opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8
    
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${left}%`;
    snowflake.style.animationDuration = `${animationDuration}s`;
    snowflake.style.animationDelay = `${animationDelay}s`;
    snowflake.style.opacity = opacity;
    
    container.appendChild(snowflake);
  };

  return <div className="snowfall" ref={containerRef}></div>;
};

export default Snowfall;
