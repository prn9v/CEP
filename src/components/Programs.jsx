'use client';
import React from 'react';
import './Programs.css';
import { BookOpen, Home, Briefcase, HeartHandshake } from 'lucide-react';

const Programs = () => {
  const programsData = [
    {
      icon: <Home size={36} />,
      title: 'Shelter & Support',
      description: 'Offering temporary and permanent shelter options along with essential support services.'
    },
    {
      icon: <Briefcase size={36} />,
      title: 'Skills Development',
      description: 'Training in various vocational skills to ensure sustainable livelihood and financial independence.'
    },
    {
      icon: <HeartHandshake size={36} />,
      title: 'Community Integration',
      description: 'Programs focused on reintegrating rehabilitated individuals back into mainstream society.'
    }
  ];

  return (
    <section className="programs-section" id="programs">
      <div className="container">
        <div className="section-header">
          <h2>Our Programs</h2>
          <p className="section-subheading">Comprehensive Rehabilitation Initiatives</p>
        </div>
        
        <div className="programs-grid">
          {programsData.map((program, index) => (
            <div className="program-card" key={index}>
              <div className="program-icon">
                {program.icon}
              </div>
              <h3 className="program-title">{program.title}</h3>
              <p className="program-description">{program.description}</p>
              <a href="#" className="program-link">Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
