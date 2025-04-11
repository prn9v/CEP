'use client';
import React, { useState, useEffect } from 'react';
import './Stats.css';

const Stats = () => {
  const [counts, setCounts] = useState({
    people: 0,
    volunteers: 0,
    donors: 0,
    projects: 0
  });
  
  const targets = {
    people: 500,
    volunteers: 250,
    donors: 1000,
    projects: 30
  };
  
  // Animate the counting effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const frameRate = 20; // 20 frames per second
    const totalFrames = duration / (1000 / frameRate);
    let frame = 0;
    
    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      
      setCounts({
        people: Math.floor(progress * targets.people),
        volunteers: Math.floor(progress * targets.volunteers),
        donors: Math.floor(progress * targets.donors),
        projects: Math.floor(progress * targets.projects)
      });
      
      if (frame === totalFrames) {
        clearInterval(interval);
      }
    }, 1000 / frameRate);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{counts.people}+</div>
            <div className="stat-label">People Rehabilitated</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{counts.volunteers}+</div>
            <div className="stat-label">Active Volunteers</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{counts.donors}+</div>
            <div className="stat-label">Generous Donors</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{counts.projects}+</div>
            <div className="stat-label">Ongoing Projects</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
